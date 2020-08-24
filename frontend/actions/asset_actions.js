import * as APIUtil from '../util/asset_util';

export const UPDATE_ASSET_PRICE = 'UPDATE_ASSET_PRICE';
export const UNWATCH_ASSET = 'UNWATCH_ASSET';
export const UPDATE_HOLDING = 'UPDATE_HOLDING';
export const RECEIVE_PURCHASE_ERRORS = 'RECEIVE_PURCHASE_ERRORS';
export const CLEAR_PURCHASE_ERRORS = 'CLEAR_PURCHASE_ERRORS';
export const RECEIVE_NEW_ASSET = 'RECEIVE_NEW_ASSET';

const updateAssetPrice = (asset) => ({
  type: UPDATE_ASSET_PRICE,
  asset
});

const unwatchAsset = ticker => ({
  type: UNWATCH_ASSET,
  ticker
});

const updateHolding = (asset) => ({
  type: UPDATE_HOLDING,
  asset
});

const receivePurchaseErrors = errors => ({
  type: RECEIVE_PURCHASE_ERRORS,
  errors
});

const receiveNewAsset = asset => ({
  type: RECEIVE_NEW_ASSET,
  asset
});

export const sendNewAssetPrice = (assetId, newPrice) => dispatch => (
  APIUtil.updateAsset(assetId, newPrice)
    .then((asset) => dispatch(updateAssetPrice(asset)))
);

export const requestUnwatch = holdingId => dispatch => (
  APIUtil.deleteHolding(holdingId)
    .then(({ ticker }) => dispatch(unwatchAsset(ticker)))
);

export const updateQuantity = (holdingId, newQuantity) => dispatch => (
  APIUtil.updateHolding(holdingId, newQuantity)
    .then((asset) => dispatch(updateHolding(asset)))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);

export const createNewHolding = (assetId, userId, quantity) => dispatch => (
  APIUtil.postHolding(assetId, userId, quantity)
    .then((asset) => dispatch(receiveNewAsset(asset)))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);