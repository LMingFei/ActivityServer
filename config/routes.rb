Activity::Application.routes.draw do
  get "manager_logined" => "manager#manager_logined"
  get "manager_logined?id=:id" => "manager#manager_logined"

  get "forgot1" =>'forgot#forgot1'
  post "forgot1" =>'forgot#forgot1_post'

  get "forgot2" =>'forgot#forgot2'
  post "forgot2" => 'forgot#forgot2_post'

  get "forgot3" =>'forgot#forgot3'
  post "forgot3" => 'forgot#forgot3_post'

  get 'index' => 'user#index'
  post 'index' =>'user#login'

  get "logout" => "user#logout"

  get 'user_logined' =>'user#user_logined'
  post 'user_logined' =>'user#user_logined'

  get 'register' => 'user#register'
  post 'register' => 'user#create'

  post 'login' => 'user#login'
  root 'user#index'

  get 'add_user' => 'manager#add_user'

  post 'add_user' =>'manager#create_user'

  get "edit_user" =>"manager#edit_user"

  patch "edit_user"=>"manager#update_user"

  get 'forgot/error_page'
end
