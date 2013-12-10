#encoding: utf-8
class ManagerController < ApplicationController

  before_filter :protect

  def manager_logined
    if IsAdmin?
      @users=User.where("id>0").order("created_at").paginate(page:params[:page],:per_page=>'4')||User.new
      if params[:id]
        @delete_user=User.find_by_id(params[:id])
        respond_to do |format|
        if @delete_user.destroy
            params[:id]=nil
            format.html{redirect_to manager_logined_path}
            format.js

        else
          format.html
          end
        end
      end
    else
      redirect_to '/index'
    end
  end




  def add_user
    @user=User.new
  end



  def create_user
    @user=User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to root_url}
      else
        format.html { render action: '/add_user'}
      end
    end
  end


  def destroy_user
  end


  def edit_user

    @user=User.find_by_id(params[:id])
  end

  def update_user
    @user=User.find_by_name(params[:user][:name])
    @user.password=params[:user][:password]
    @user.password_confirmation=params[:user][:password_confirmation]
    respond_to do |format|
      if @user.update(password:@user.password)
        format.html { redirect_to root_url}
        reset_session
      else
        format.html { render action: '/edit_user'}
      end
    end
  end


private
  def user_params
    params.require(:user).permit(:name, :password, :question,:answer,:password_confirmation)
  end

  def protect

    unless User.logged_in?(session)
      #session[:protected_page]=request.request_uri
      flash[:notice]="请先登录"
      redirect_to '/index'
      return false
    end
  end
end
