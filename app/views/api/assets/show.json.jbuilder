json.extract! @asset, :name, :ticker, :recent_price, :id, :percent_change
json.updated_at @asset.updated_at.to_i