class ApplicationController < ActionController::Base
  helper_method :sign_in_token
  helper_method :current_user

  def sign_in_token
    # token ||= SignInToken.find_by(token: cookies[:signInToken])
    # if token
    #   token.update_status
    # end
    @sign_in_token ||= SignInToken.find_by(status: 'signed',token: cookies[:signInToken])
  end

  def current_user
    if cookies[:pub_key].present?
      @current_user ||= User.find_by_pub_key(cookies[:pub_key])
    elsif sign_in_token
      @current_user ||= sign_in_token.user
    end
  end

end
