class CreateHoldings < ActiveRecord::Migration[5.2]
  def change
    create_table :holdings do |t|
      t.integer :user_id, null: false
      t.integer :asset_id, null: false
      t.integer :quantity, null: false
      t.timestamps
      t.index [:user_id, :asset_id], unique: true
    end
  end
end
