json.extract! @holding, :quantity
json.holding_id @holding.id
json.extract! @holding.asset, :ticker, :name, :recent_price, :percent_change, :id
json.updated_at @holding.asset.updated_at.to_i