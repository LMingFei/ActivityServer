class AddwinnerToBids < ActiveRecord::Migration
  def change
    add_column :bids,:winner_phone,:string
  end
end
