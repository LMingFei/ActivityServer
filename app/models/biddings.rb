class Biddings < ActiveRecord::Base

  def self.save_all(biddings)
    if biddings
    biddings.each do|bidding|
      new_bidding=Biddings.new(bidding);
      new_bidding.save
      end
    else
      return true
    end
  end
end
