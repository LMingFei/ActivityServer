class Activities < ActiveRecord::Base
  def self.save_all(activities)
    if activities
      activities.each do|activity|
        new_activity=Activities.new(activity);
        new_activity.save
      end
    else
      return true
    end
  end
end


