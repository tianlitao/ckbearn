class ContractReceive < ApplicationRecord
  belongs_to :epoch, optional: true
  RestClient.proxy = 'http://127.0.0.1:58760'
  before_create do
    self.epoch_id = Epoch.where("begin_number < ? and end_number > ?", self.block_number, self.block_number).first&.id
  end


  def self.get_all_transactions
    page = 1
    page_size = 100
    loop do
      data = JSON.parse RestClient.get("#{Setting.explore_url}/api/v1/address_transactions/#{Setting.contract_address}?page=#{page}&page_size=#{page_size}",{ "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json" }).body
      data['data'].each do |da|
        att = da['attributes']
        rece = ContractReceive.find_or_initialize_by(transaction_hash: att['transaction_hash'],block_number: att['block_number'])
        break unless rece.new_record?
        rece.assign_attributes(address: att['display_inputs'][0]['address_hash'],capacity: att['income'])
        rece.save if rece.changed?
      end
      break if (page_size * page) > data['meta']['total']
    end
  end

  def self.get_index_static
    data = JSON.parse(RestClient.get("#{Setting.explore_url}/api/v1/statistics", { "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json" }).body) rescue {}
    Setting.index_statistic = data['data']['attributes'] rescue {}
    Setting.index_statistic_updated_at = Time.now if Setting.index_statistic.present?
    a = JSON.parse(RestClient.get("#{Setting.explore_url}/api/v1/blocks/#{data['data']['attributes']['tip_block_number'].to_i}",{ "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json" }).body)
    block = a['data']['attributes']
    epo = Epoch.find_or_initialize_by(epo_num: block['epoch'])
    epo.assign_attributes(epo_length: block['length'],epo_index: block['block_index_in_epoch'],begin_number: block['start_number'],end_number: block['start_number'].to_i + block['length'].to_i - 1)
    epo.save if epo.changed?
  end

  def self.check_epoch
    get_index_static
    if (epoch = Epoch.last(2).first) && !epoch.is_open
      new = Epoch.last
      b = JSON.parse(RestClient.get("#{Setting.explore_url}/api/v1/blocks/#{new.begin_number.to_i}",{ "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json" }).body)
      last = b['data']['attributes']['block_hash'].last
      epoch.update(win_number: last)
      success_address = {}
      sum_capacity = ContractReceive.where("block_number >= ? and block_number <= ?", epoch.begin_number, epoch.end_number).where("capacity >= ?", 1000*10*8).sum(:capacity)
      success_capacity = ContractReceive.where(is_use: false).where("capacity >= ?", 1000*10*8).where("transaction_hash like '%#{last}'").sum(:capacity)
      ContractReceive.where("block_number >= ? and block_number <= ?", epoch.begin_number, epoch.end_number).where("capacity >= ?", 1000*10*8).where("transaction_hash like '%#{last}'").each do |receive|
        success_address[receive.address] = (receive.capacity/success_capacity).to_i * sum_capacity
      end
      if success_address.present?
        api = CKB::API.new(host: Setting.api_rpc)
        indexer_api = CKB::Indexer::API.new(Setting.api_indexer_rpc)
        c = CKB::Wallet.from_hex(api, Setting.contract_private, indexer_api: indexer_api)
        tx = c.send_multi_capacity(success_address, fee: 1000, outputs_validator: 'passthrough')
        loop do
          result = api.get_transaction(tx)
          if result.tx_status.status == 'committed'
            epoch.update(is_open: true, sum_capacity: sum_capacity,win_capacity: success_capacity,win_address_num: success_address.size,win_tx: tx)

            break
          end
          if result.tx_status.status == 'rejected'
            break
          end
          sleep(1)
        end
      else
        epoch.update(is_open: true, sum_capacity: sum_capacity,win_capacity: success_capacity,win_address_num: success_address.size)
      end
    end
  end

  # api = CKB::API.new(host: 'https://testnet.ckb.dev/')
  #
  # indexer_api = CKB::Indexer::API.new('https://testnet.ckb.dev/indexer')
  # a = CKB::Wallet.from_hex(api, "0x09c38288cc0319cfde702491468945ef3682b18bd711f1c48d27131d1728d5de", indexer_api: indexer_api)
  # b = CKB::Wallet.from_hex(api, "0xe621e81514043dab34606c3cd0365b2daab25283ee371b941205efd6e1164f8f", indexer_api: indexer_api)
  # c = CKB::Wallet.from_hex(api, "0xbb3e75ed36c3be2a748412f207e77c2d1022ae6551410799aff76a67d0a7d09d", indexer_api: indexer_api)
  # c.send_capacity(a.address, 1000 * 10**8, fee: 1000, outputs_validator: 'passthrough')
  # c.send_multi_capacity([a.address, b.address], 1000 * 10**8, fee: 1000, outputs_validator: 'passthrough')
  # c.send_multi_capacity({a.address => 1000 * 10**8,b.address => 333 * 10**8}, fee: 1000, outputs_validator: 'passthrough')

end
