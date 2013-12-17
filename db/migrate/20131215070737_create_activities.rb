class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :name
      t.string :status
      t.string :user_name

      t.timestamps
    end
  end
end
