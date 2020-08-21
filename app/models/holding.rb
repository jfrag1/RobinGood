class Holding < ApplicationRecord
  validates :user_id, :asset_id, :quantity, presence: true
  validates :user_id, uniqueness: {scope: :asset_id}
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }

  belongs_to :user, optional: true
  belongs_to :asset, optional: true
end