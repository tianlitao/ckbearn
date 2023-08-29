class Api::V1::CkbullsController < ActionController::API
  def get_sign_in_token
    api_secret = Setting.api_secret
    timestamp = Time.now.to_i

    hmac = OpenSSL::HMAC.new(api_secret, OpenSSL::Digest.new('sha512'))
    hmac.update(timestamp.to_s)

    signature_header = Base64.strict_encode64(hmac.digest)
    api_key_header = Setting.api_key_header


    a = JSON.parse RestClient.post("#{Setting.ckbull_host}/api/sign-in-requests",{},{'X-Api-Key' => api_key_header, 'X-Timestamp' => timestamp, 'X-Signature' => signature_header}).body

    @qr = RQRCode::QRCode.new("#{a['signInToken']}", :size => 10, :level => :h )
    p ['signInToken']
    sign = SignInToken.find_or_initialize_by(token: a['signInToken'])
    sign.assign_attributes(status: a['status'], create_time: a['createdAt'], expired_at: a['expiresAt'])
    sign.save! if sign.changed?

    render json: a.merge({html: @qr.as_html}), status: :ok
  end

  def check_status
    check_status = JSON.parse(RestClient.get("#{Setting.ckbull_host}/api/sign-in-requests/dapp/#{Setting.api_key_header}").body)
    sign_in = check_status.find{|i| i['signInToken'] == params[:sign_in_token]} || {status: 'failed'}
    render json: sign_in, status: :ok
  end

  def tran_code

    value = params[:value].to_i
    value = 1000 if value < 1000
    if sign_in_token = SignInToken.find_by(token: params[:sign_in_token])
      data = sign_in_token.send_tran(value)
    else
      data = {}
    end
    render json: data, status: :ok
  end

end