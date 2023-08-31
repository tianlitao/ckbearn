Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"

  post "home/login_in" => 'home#login_in'
  get "home/logout" => 'home#logout'

  get '/home/turbo_user_info' => 'home#turbo_user_info'
  get '/home/project' => 'home#project'
  get '/guide' => 'home#guide'
  get '/home/sign_tran' => 'home#sign_tran'
  get '/my_info' => 'home#my_info'

  resources :contract_receives, only: [:index]
  resources :epochs, only: [:index]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ckbulls, only: [] do
        collection do
          post :get_sign_in_token, :check_status, :tran_code, :joy_tran
        end
      end
    end
  end
end
