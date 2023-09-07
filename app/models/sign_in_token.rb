class SignInToken < ApplicationRecord
  belongs_to :user, optional: true

  def update_status
    begin
      RestClient.proxy = 'http://127.0.0.1:58760'

      check_status = JSON.parse(RestClient.get("#{Setting.ckbull_host}/api/sign-in-requests/dapp/#{Setting.api_key_header}").body)
      sign_in = check_status.find{|i| i['signInToken'] == self.token}
      self.status = sign_in['status']
      if self.status == 'signed'
        u = self.user || User.find_by(address: sign_in['metadata']['address']) || User.new
        u.assign_attributes(address: sign_in['metadata']['address'],chain: sign_in['metadata']['network'], from: 1)
        u.save if u.changed?
        self.user_id = u.id
      end
      self.save if self.changed?
    rescue => e
    end
  end

  def self.update_all_status
    begin
      check_status = JSON.parse(RestClient.get("#{Setting.ckbull_host}/api/sign-in-requests/dapp/#{Setting.api_key_header}").body)
      SignInToken.where(status: ['pending', 'signed']).each do |sign_in_token|
        sign_in = check_status.find{|i| i['signInToken'] == sign_in_token.token}
        sign_in_token.status = sign_in['status']
        if sign_in['metadata'].present?
          u = sign_in_token.user || User.find_by(address: sign_in['metadata']['address']) || User.new
          u.assign_attributes(address: sign_in['metadata']['address'],chain: sign_in['metadata']['network'], from: 1)
          u.save if u.changed?
          sign_in_token.user_id = u.id
        end
        sign_in_token.save if sign_in_token.changed?
      end
    rescue => e
    end
  end

  def send_tran(value = 1000)
    begin
      timestamp = Time.now.to_i

      hmac = OpenSSL::HMAC.new(Setting.api_secret, OpenSSL::Digest.new('sha512'))
      hmac.update(timestamp.to_s)
      signature_header = Base64.strict_encode64(hmac.digest)

      get_transaction = RestClient.post("#{Setting.ckbull_host}/api/transaction-request/generate-native-token-transaction", {amount: (value * 10**8).to_s,to: Setting.contract_address}.to_json, {'Content-Type' => 'application/json'})
      transaction = JSON.parse get_transaction.body
      JSON.parse(RestClient.post("#{Setting.ckbull_host}/api/transaction-request", {signInToken: self.token, transaction: transaction}.to_json,{'Content-Type' => 'application/json','X-Api-Key' => Setting.api_key_header, 'X-Timestamp' => timestamp, 'X-Signature' => signature_header}).body)
    rescue => e
      {}
    end
  end

  def self.update_task
    loop do
      # begin
      #   ContractReceive.check_epoch
      # rescue => e
      #   p e
      # end
      # begin
      #   ContractReceive.get_all_transactions
      # rescue => e
      #   p e
      # end
      SignInToken.update_all_status
      sleep 2
    end

  end

end
