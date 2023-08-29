class ApplicationController < ActionController::Base
  helper_method :sign_in_token
  helper_method :current_user

  def sign_in_token
    token ||= SignInToken.find_by(token: cookies[:signInToken])
    if token
      token.update_status
    end
    @sign_in_token ||= SignInToken.find_by(status: 'signed',token: cookies[:signInToken])
  end

  def current_user
    @current_user ||= sign_in_token.user if sign_in_token
  end

end
