import * as APIUtil from '../util/asset_util';
import updateUserBuyingPower from '../util/buying_power_util';
import { fetchOneDayGraphData } from '../util/external_api_util';
import { clearErrors } from './session_actions';

export const UPDATE_ASSET_PRICE = 'UPDATE_ASSET_PRICE';
export const UNWATCH_ASSET = 'UNWATCH_ASSET';
export const UPDATE_HOLDING = 'UPDATE_HOLDING';
export const RECEIVE_PURCHASE_ERRORS = 'RECEIVE_PURCHASE_ERRORS';
export const RECEIVE_NEW_ASSET = 'RECEIVE_NEW_ASSET';
export const RECEIVE_NEW_BUYING_POWER = 'RECEIVE_NEW_BUYING_POWER';
export const RECEIVE_PORTFOLIO_DATA = 'RECEIVE_PORTFOLIO_DATA';

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

const receiveNewBuyingPower = buyingPower => ({
  type: RECEIVE_NEW_BUYING_POWER,
  buyingPower
});

const receivePortfolioData = (tickerKeyToData, ownedAssets, buyingPower) => ({
  type: RECEIVE_PORTFOLIO_DATA,
  tickerKeyToData,
  ownedAssets,
  buyingPower
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
);

export const createNewHolding = (assetId, userId, quantity) => dispatch => (
  APIUtil.postHolding(assetId, userId, quantity)
    .then((asset) => dispatch(receiveNewAsset(asset)))
);

export const sendBuyingPowerChange = (userId, delta) => dispatch => (
  updateUserBuyingPower(userId, delta)
    .then((buyingPower) => dispatch(receiveNewBuyingPower(buyingPower)))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);

export const buyAsset = (userId, holdingId, oldQuant, quantBuying, price) => dispatch => (
  updateUserBuyingPower(userId, (-1 * quantBuying * price))
    .then((buyingPower) => dispatch(receiveNewBuyingPower(buyingPower)))
    .then(() => dispatch(updateQuantity(holdingId, oldQuant + quantBuying)))
    .then(() => dispatch(clearErrors()))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);

export const sellAsset = (userId, holdingId, oldQuant, quantSelling, price) => dispatch => (
  APIUtil.updateHolding(holdingId, (oldQuant - quantSelling))
    .then((asset) => dispatch(updateHolding(asset)))
    .then(() => updateUserBuyingPower(userId, (quantSelling * price)))
    .then((buyingPower) => dispatch(receiveNewBuyingPower(buyingPower)))
    .then(() => dispatch(clearErrors()))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);

export const buyNewAsset = (userId, assetId, quantity, price) => dispatch => (
  updateUserBuyingPower(userId, (-1 * quantity * price))
    .then((buyingPower) => dispatch(receiveNewBuyingPower(buyingPower)))
    .then(() => dispatch(createNewHolding(assetId, userId, quantity)))
    .then(() => dispatch(clearErrors()))
    .fail(({ responseJSON }) => dispatch(receivePurchaseErrors(responseJSON)))
);

export const updatePortfolio = (tickers, ownedAssets, buyingPower) => dispatch => {
  const graphFetches = [];
  const tickerKeyToData = {};
  tickers.forEach((ticker) => {
    const graphFetch = fetchOneDayGraphData(ticker);
    tickerKeyToData[ticker] = graphFetch;
    graphFetches.push(graphFetch);
  });
  return Promise.all(graphFetches).then(() => 
    dispatch(receivePortfolioData(tickerKeyToData, ownedAssets, buyingPower)));
}