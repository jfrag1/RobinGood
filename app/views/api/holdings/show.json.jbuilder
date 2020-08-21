json.set! @holding.id do
  json.extract! @holding, :asset_id, :quantity
end