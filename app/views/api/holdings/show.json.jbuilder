json.extract! @holding, :quantity
json.holding_id @holding.id
json.extract! @holding.asset, :ticker, :name, :id