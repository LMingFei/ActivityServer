class SignUps < ActiveRecord::Base

  def self.save_all(signups)
    if signups
      signups.each do|signup|
        new_signup=SignUps.new(signup);
        new_signup.save
      end
    else
      return true
    end
  end
end
