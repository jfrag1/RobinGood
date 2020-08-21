json.set! @asset.id do
  json.extract! @asset, :name, :ticker, :recent_price
end