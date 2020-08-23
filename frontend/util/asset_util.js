export const fetchAsset = assetId => (
  $.ajax({
    url: `/api/assets/${assetId}`,
    method: 'GET'
  })
);

export const updateAsset = (assetId, newPrice) => (
  $.ajax({
    url: `/api/assets/${assetId}`,
    method: 'PATCH',
    data: { price: newPrice }
  })
);

export const postHolding = (assetId, userId, quantity) => (
  $.ajax({
    url: '/api/holdings',
    method: 'POST',
    data: { holding: { asset_id: assetId, user_id: userId, quantity } }
  })
);

export const updateHolding = (holdingId, newQuantity) => (
  $.ajax({
    url: `/api/holdings/${holdingId}`,
    method: 'PATCH',
    data: { quantity: newQuantity }
  })
);

export const deleteHolding = holdingId => (
  $.ajax({
    url: `/api/holdings/${holdingId}`,
    method: 'DELETE'
  })
);