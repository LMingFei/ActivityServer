#encoding: utf-8

class UserController < ApplicationController
  before_filter :protect,:except => [:index,:register,:create,:login]

  def index
    if User.logged_in?(session)
      if IsAdmin?
        redirect_to '/manager_logined'
      else
        redirect_to "/user_logined"
      end
    end
  else
    @title="用户登录"
    @user=User.new
  end

  def login
    user= User.find_by_name(params[:user][:name])
    if user&&user.authenticate(params[:user][:password])
      session[:token] = user.token
      if IsAdmin?
        redirect_to '/manager_logined'
      else
        redirect_to '/user_logined'
      end
    else
      flash[:error] ="无效的用户名或密码"
      redirect_to root_url
    end
  end

  def register
    @title="注册用户"
    @user=User.new
  end

  def create
    @user=User.new(user_params)
    respond_to do |format|
      if @user.save
        flash[:notice]="用户"+@user.name+"创建成功!"
        format.html { redirect_to '/index'}
      else
        @user.clear_password!
        format.html { render action: '/register'}
      end
    end
  end

  def user_logined
    unless IsAdmin?

    else
      redirect_to '/manager_logined'
    end
  end

  def logout
    flash[:notice]="用户已"+current_user.name+"退出"
    User.logout!(session)
    redirect_to root_url
  end

private
  def user_params
    params.require(:user).permit(:name, :password, :question,:answer,:password_confirmation)
  end

  def protect
    unless User.logged_in?(session)
      #session[:protected_page]=request.request_uri
      flash[:notice]="请先登录"
      redirect_to :action => "index"
      return false
    end
  end

  def redirect_to_forwarding_url
    if(redirect_url=session[:protected_page])
      session[:protected_page]=nil
      redirect_to redirect_url
    else
      redirect_to :action => "index"
    end
  end

end
