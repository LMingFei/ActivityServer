class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.string :name
      t.string :status
      t.string :activity_name
      t.string :user_name

      t.timestamps
    end
  end
end
