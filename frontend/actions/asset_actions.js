import * as APIUtil from '../util/asset_util';

export const RECEIVE_CURRENT_ASSETS = 'RECEIVE_CURRENT_ASSETS';

export const receiveCurrentAssets = assets => ({
  type: RECEIVE_CURRENT_ASSETS,
  assets
});
