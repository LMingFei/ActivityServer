class CreateBiddings < ActiveRecord::Migration
  def change
    create_table :biddings do |t|
      t.string :name
      t.string :phone
      t.string :price
      t.string :bid_name
      t.string :activity_name
      t.string :user_name

      t.timestamps
    end
  end
end
