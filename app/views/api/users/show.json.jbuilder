json.user do
  json.extract! @user, :id, :username, :buying_power
end

json.assets do
  @user.holdings.each do |holding|
    asset = Asset.find(holding.asset_id)
    json.set! asset.id do
      json.extract! asset, :id, :ticker, :name, :recent_price, :percent_change
      json.holding_id holding.id
      json.quantity holding.quantity
      json.updated_at asset.updated_at.to_i
    end
  end
end