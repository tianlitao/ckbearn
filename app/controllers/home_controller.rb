class HomeController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:login_in, :joy_tran]

  def index
    @epoch = Epoch.last
  end

  def project
  end

  def guide
  end

  def get_transactions
  end

  def login_in
    user = User.find_or_initialize_by(address: params[:address])
    user.assign_attributes({ key_type: params[:keyType], alg: params[:alg], pub_key: params[:pubkey], attestation: params[:attestation], from: 0 })
    user.save if user.changed?
    cookies[:pub_key] = user.pub_key
    cookies[:address] = user.address
    cookies[:contract_address] = Setting.ckb_address
  end

  def logout
    cookies[:signInToken] = nil
    cookies[:pub_key] = nil
    return redirect_to root_url
    # return redirect_back(fallback_location: root_path)
    # render :layout => false
  end

end
