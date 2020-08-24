class AddPercentChangeToAssets < ActiveRecord::Migration[5.2]
  def change
    add_column :assets, :percent_change, :decimal, precision: 4, scale: 2
  end
end
