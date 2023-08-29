# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :default_locale, default: "en", type: :string
  # field :confirmable_enable, default: "0", type: :boolean
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true
  field :api_secret, type: :string, default: ''
  field :api_key_header, type: :string, default: ''
  field :ckbull_host, type: :string, default: ''
  field :ckb_address, type: :string, default: ''
  field :index_statistic, type: :hash, default: {}
  field :index_statistic_updated_at, type: :datetime
  field :explore_url, type: :string, default: ''
  field :contract_address, type: :string, default: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqq90ppgxvxsmw27kcevagwf44r4wj0d2dyc2d0dgy'
  field :api_rpc, type: :string, default: 'https://testnet.ckb.dev/'
  field :api_indexer_rpc, type: :string, default: 'https://testnet.ckb.dev/indexer/'
  field :contract_private, type: :string, default: ''
end
