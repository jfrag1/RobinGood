class Asset < ApplicationRecord
  validates :name, :ticker, presence: true
end