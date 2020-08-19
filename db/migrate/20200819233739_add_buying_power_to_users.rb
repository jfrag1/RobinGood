class AddBuyingPowerToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :buying_power, :integer, null: false
    add_timestamps :users
  end
end
