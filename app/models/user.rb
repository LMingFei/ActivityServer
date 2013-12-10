#encoding:utf-8


class User < ActiveRecord::Base
  validates_uniqueness_of :name,:message => "用户名已存在"
  validates_length_of :name,:in => 4..10,:message => "用户名应为4-10位字符"
  validates_length_of :password,:minimum => 4,:message => "密码最小为4位字符"
  validates_presence_of :question,:message=>"找回密码问题不能为空"
  validates_presence_of :answer,:message=>"找回密码答案不能为空"
  has_secure_password


  before_create{generate_token(:token)}
  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column=>self[column])
  end

end
