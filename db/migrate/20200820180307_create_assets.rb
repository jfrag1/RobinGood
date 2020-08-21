class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :name, null: false
      t.string :ticker, null: false
      t.integer :recent_price
      t.timestamps
      t.index :name, unique: true
      t.index :ticker, unique: true
    end
  end
end
