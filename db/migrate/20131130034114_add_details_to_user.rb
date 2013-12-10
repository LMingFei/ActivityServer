class AddDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :pwd, :string
    add_column :users, :question, :text
    add_column :users, :answer, :text
  end
end
