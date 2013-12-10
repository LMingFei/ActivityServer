#encoding: utf-8
class ForgotController < ApplicationController
  def forgot1
    @user=User.new
  end


  def forgot1_post
    unless params[:user][:name].empty?
      user= User.find_by_name(params[:user][:name])
      respond_to do |format|
        if user
          if user.token
            session[:token]=user.token
            format.html { redirect_to forgot2_path}
          else
            format.html { redirect_to forgot_error_page_path}
          end
        else
          format.html { redirect_to forgot_error_page_path}
        end
      end
    else
      flash[:error] ="帐号不能为空"
      redirect_to '/forgot1'
    end
  end

  def forgot2
    if session[:token]
      @user=User.new
      user=User.find_by_token(session[:token])
      @user.question=user.question
    else
      reset_session
      redirect_to '/forgot1'
    end
  end

  def forgot2_post
    if session[:token]
      user=User.find_by_token(session[:token])
      if user.answer==params[:user][:answer]
        redirect_to '/forgot3'
      else
        flash[:error] ="答案错误"
        redirect_to '/forgot2'
      end
    end
  end

  def forgot3
    if session[:token]
      @user=User.find_by_token(session[:token])
    else
      redirect_to '/forgot1'
    end
  end

  def forgot3_post
    if session[:token]
      @user=User.find_by_token(session[:token])
      @user.password=params[:user][:password]
      @user.password_confirmation=params[:user][:password_confirmation]
      respond_to do |format|
        if @user.update(password:@user.password)
          format.html { redirect_to root_url}
          reset_session
        else
          format.html { render action: '/forgot3'}
        end
      end


    else
      redirect_to '/forgot/error_page'
      reset_session
    end
  end

  def error_page

  end
private
  def user_params
    user=User.find_by_token(session[:token])
    params.require(:user).permit(user.name, :password, user.question,user.answer,:password_confirmation)
  end

end
