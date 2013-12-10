#encoding:utf-8


class User < ActiveRecord::Base
  NAME_MIN_LENGTH=4
  NAME_MAX_LENGTH=10
  NAME_RANGE=NAME_MIN_LENGTH..NAME_MAX_LENGTH
  PASSWORD_MIN_LENGTH=4
  PASSWORD_MAX_LENGTH=20
  PASSWORD_RANGE=PASSWORD_MIN_LENGTH..PASSWORD_MAX_LENGTH

  NAME_SIZE=10
  PASSWORD_SIZE=20


  validates_uniqueness_of :name
  validates_length_of :name,:in => NAME_RANGE
  validates_length_of :password,:in => PASSWORD_RANGE
  validates_presence_of :question,:answer


  has_secure_password


  before_create{generate_token(:token)}
  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column=>self[column])
  end

  def login!(session)
    session[:token]=self.token
  end

  def self.logout!(session)
    session[:token]=nil
  end

  def clear_password!
    self.password=nil
  end

  def self.logged_in?(session)
    session[:token]
  end
end

