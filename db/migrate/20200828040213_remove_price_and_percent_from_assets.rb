class RemovePriceAndPercentFromAssets < ActiveRecord::Migration[5.2]
  def change
    remove_column :assets, :recent_price
    remove_column :assets, :percent_change
  end
end
