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

export const watchAsset = (assetId, userId) => (
  $.ajax({
    url: '/api/holdings',
    method: 'POST',
    data: { holding: { asset_id: assetId, user_id: userId, quantity: 0 } }
  })
);

export const buyNewAsset = holding => (
  $.ajax({
    url: '/api/holdings',
    method: 'POST',
    data: { holding }
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