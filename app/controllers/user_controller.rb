#encoding: utf-8
class UserController < ApplicationController
  before_filter :protect,:except => [:login,:register]

  def index
    if cookies.permanent[:token]
      if cookies.permanent[:token].empty?
        redirect_to '/manager_logined'
      else
        redirect_to '/user_logined'
      end
    else
      @user=User.new
    end
  end

  def register
    @user=User.new
  end

  def create
    @user=User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to '/index'}
      else
        format.html { render action: '/register'}
      end
    end
  end

  def user_logined
    unless cookies.permanent[:token]
      redirect_to root_url
    else

    end
  end

  def login
    user= User.find_by_name(params[:user][:name])
    if user&&user.authenticate(params[:user][:password])
      cookies.permanent[:token] = user.token
      if user.authority
        redirect_to '/manager_logined'
      else
        redirect_to '/user_logined'
      end
    else
      flash[:error] ="无效的用户名或密码"
      redirect_to :index
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to '/index'
  end

private
  def user_params
    params.require(:user).permit(:name, :password, :question,:answer,:password_confirmation)
  end
end
