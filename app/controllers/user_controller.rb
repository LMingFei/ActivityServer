#encoding: utf-8
class UserController < ApplicationController
  before_filter :protect,:except => [:index,:register,:create,:login,:phone_login,:data_synchronous]
  skip_before_filter :verify_authenticity_token,:only => [:phone_login,:data_synchronous]
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

  def user_logined
    unless IsAdmin?
      @title='用户登录界面'
      @activities=Activities.where(:user_name=>current_user.name).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||Activities.new
      @count=0
      @active_bid=Bids.where(:user_name=>current_user.name,:status=>"started").first
    else
      redirect_to '/manager_logined'
    end
  end

  def synchronous_show
    @count=0
    @active_bid=Bids.where(:user_name=>current_user.name,:activity_name=>params[:activity_name]).order(:updated_at).first
    @active_bid
    @biddings=Biddings.where(:bid_name=>@active_bid.name,:user_name=>current_user.name,:activity_name=>@active_bid.activity_name)
    @biddings_length=@biddings.length
    @sign_ups_length=SignUps.where(:activity_name=>@active_bid.activity_name,:user_name=>current_user.name).length;
    @winner=@biddings.where(:phone=>@active_bid.winner_phone).first
  end

  def data_synchronous
    user=User.find_by_name(params[:name]);
    activities=params[:activities];
    sign_ups=params[:sign_ups];
    bids=params[:bids]
    biddings=params[:biddings];
    respond_to do |format|
      Activities.delete_all(:user_name=>user.name);
      Bids.delete_all(:user_name=>user.name);
      Biddings.delete_all(:user_name=>user.name);
      SignUps.delete_all(:user_name=>user.name);
      if(Activities.save_all(activities)&&Bids.save_all(bids)&&Biddings.save_all(biddings)&&SignUps.save_all(sign_ups))
          format.json{render :json => true}
      else
          format.json{render :json => false}
      end
    end
  end

 def sign_up_list
   @sign_ups=SignUps.where(:user_name=>current_user.name,:activity_name=>params[:name]).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||SignUps.new
   @count=0
   if params[:page]
     @count=Integer(((Integer(params[:page])-1)*PER_PAGE_COUNT))
     end
 end

 def bids_list
  @bids=Bids.where(:user_name=>current_user.name,:activity_name=>params[:name]).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||Bids.new
  @count=0
  if params[:page]
    @count=Integer(((Integer(params[:page])-1)*PER_PAGE_COUNT))
  end
  end

 def bidding_list
   @biddings=Biddings.where(:user_name=>current_user.name,:activity_name=>params[:activity_name],:bid_name=>params[:bid_name]).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||Biddings.new
   @count=0;
   if params[:page]
     @count=Integer(((Integer(params[:page])-1)*PER_PAGE_COUNT))
     end
   @biddings_classified=@biddings.group(:price).paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||Biddings.new;
   @biddings_classified.each do |bidding|
     bidding[:name]=@biddings.where(:price=>bidding.price).length
   end
   current_bid=Bids.where(:activity_name=>params[:activity_name],:user_name=>current_user.name,:name=>params[:bid_name]).first
   @winner=@biddings.find_by_phone(current_bid.winner_phone);
   @status=current_bid.status
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