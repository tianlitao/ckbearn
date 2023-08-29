class SignInToken < ApplicationRecord
  belongs_to :user, optional: true

  def update_status
    begin
      check_status = JSON.parse(RestClient.get("#{Setting.ckbull_host}/api/sign-in-requests/dapp/#{Setting.api_key_header}").body)
      sign_in = check_status.find{|i| i['signInToken'] == self.token}
      self.status = sign_in['status']
      if self.status == 'signed'
        u = self.user || User.find_by(address: sign_in['metadata']['address']) || User.new
        u.assign_attributes(address: sign_in['metadata']['address'],chain: sign_in['metadata']['network'])
        u.save if u.changed?
        self.user_id = u.id
      end
      self.save if self.changed?
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

end
