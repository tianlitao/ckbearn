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
    sign = SignInToken.find_or_initialize_by(token: a['signInToken'])
    sign.assign_attributes(status: a['status'], create_time: a['createdAt'], expired_at: a['expiresAt'])
    sign.save! if sign.changed?

    render json: a.merge({html: @qr.as_html}), status: :ok
  end

  def check_status
    if sign_in_token = SignInToken.find_by(token: params[:sign_in_token])
      render json: {status: sign_in_token.status, token: sign_in_token.token, address: sign_in_token.user&.address, chain: sign_in_token.user&.chain}, status: :ok
    else
      render json: {status: 'failed'}, status: :ok
    end
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

  def joy_tran
    begin
      data = {
        version: params[:version],
        cell_deps: params[:cellDeps].values.map{|i| i.deep_transform_keys(&:underscore)},
        header_deps: [],
        inputs: params[:inputs].values.map{|i| i.deep_transform_keys(&:underscore)},
        outputs: params[:outputs].values.map{|i| i.deep_transform_keys(&:underscore)}.each{|i| i['type'] = nil if i['type'].blank?},
        outputs_data: params[:outputsData],
        witnesses: params[:witnesses],
      }
      rpc = CKB::RPC.new(host: Setting.api_rpc)
      tx = rpc.send_transaction(data, 'passthrough')
      return render json: {success: true, tx: tx}, status: :ok
    rescue => e
      p '============'
      p e
      p '============'
      return render json: {success: false,message: 'Transaction failed, please try again later.'}, status: :ok
    end
  end

end