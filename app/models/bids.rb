class Bids < ActiveRecord::Base

  def self.save_all(bids)
    if bids
    bids.each do|bid|
      new_bid=Bids.new(bid);
      new_bid.save
      end
    else
      return true
    end
  end
end
