class Asset < ApplicationRecord
  validates :name, :ticker, presence: true

  def update_price!
    if Time.now - self.updated_at > 600 || !self.recent_price
      new_price = HTTParty.get("https://cloud.iexapis.com/stable/stock/#{self.ticker.downcase}/quote/latestPrice?token=#{Rails.application.credentials.cloudIEX[:api_key]}")
      self.recent_price = new_price * 100
      self.save!
    end
    self.recent_price
  end
end