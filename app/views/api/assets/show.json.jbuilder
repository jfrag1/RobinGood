json.extract! @asset, :name, :ticker, :recent_price, :id
json.updated_at @asset.updated_at.to_i