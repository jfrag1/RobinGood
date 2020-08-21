json.user do
  json.extract! @user, :id, :username, :buying_power
end

json.assets do
  @user.holdings.each do |holding|
    asset = Asset.find(holding.asset_id)
    json.set! asset.id do
      json.extract! asset, :id, :ticker, :name, :recent_price
      json.holding_id holding.id
      json.quantity holding.quantity
      json.seconds_since_update = Time.now - holding.updated_at
    end
  end
end