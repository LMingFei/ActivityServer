#encoding: utf-8
class UserController < ApplicationController
  before_filter :protect,:except => [:index,:register,:create,:login,:phone_login]
  skip_before_filter :verify_authenticity_token,:only => :phone_login
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
      user.login!(session)
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
        @user.login!(session)
        format.html { redirect_to '/user_logined'}
      else
        @user.clear_password!
        format.html { render action: '/register'}
      end
    end
  end

  def user_logined
    unless IsAdmin?
      @title='用户登录界面'
    else
      redirect_to '/manager_logined'
    end
  end

  def logout
    flash[:notice]="用户"+current_user.name+"已退出"
    User.logout!(session)
    redirect_to root_url
  end

  def phone_login

    user= User.find_by_name(params[:name])
    respond_to do |f|
      if user&&user.authenticate(params[:password])
        f.json {render :json=> true}
      else
        f.json {render :json=> false}
      end
    end
  end

  def data_synchronous
    user=User.find_by_name(params[:name]);
    activities=params[:activities];
    sign_ups=params[:sign_ups];
    bids=params[:bids]
    biddings=params[:biddings];
  end

private
  def user_params
    params.require(:user).permit(:name, :password, :question,:answer,:password_confirmation)
  end

  def protect
    unless User.logged_in?(session)
      flash[:notice]="请先登录"
      redirect_to :action => "index"
      return false
    end
  end

end
