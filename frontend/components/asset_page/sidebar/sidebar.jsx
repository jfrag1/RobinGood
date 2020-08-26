import React from 'react';
import BuyOrSellForm from './buy_or_sell_form';
import BuyOnlyForm from './buy_only_form';

const Sidebar = (props) => {

  if (props.owned) {
    return (
      <BuyOrSellForm
        asset={props.asset}
        buyingPower={props.user.buyingPower}
        quantity={props.owned.quantity}
        errors={props.errors}
        clearErrors={() => props.clearErrors()}
        buyAsset={(quantBuying) => 
          props.buyAsset(
            props.user.id,
            props.owned.holdingId,
            props.owned.quantity,
            quantBuying
          )}
        sellAsset={(quantSelling) =>
          props.sellAsset(
            props.user.id,
            props.owned.holdingId,
            props.owned.quantity,
            quantSelling
          )} />
    );
  } else if (props.watched) {
    return (
      <BuyOnlyForm
        asset={props.asset}
        buyingPower={props.user.buyingPower}
        errors={props.errors}
        clearErrors={() => props.clearErrors()}
        watchedStatus="Watched"
        watchAction={() => props.unwatchAsset(props.watched.holdingId)}
        buyAction={(quantity) =>
          props.buyAsset(
            props.user.id,
            props.watched.holdingId,
            0,
            quantity
          )} />
    );
  } else {
    return (
      <BuyOnlyForm
        asset={props.asset}
        buyingPower={props.user.buyingPower}
        errors={props.errors}
        clearErrors={() => props.clearErrors()}
        watchedStatus="Unwatched"
        watchAction={() => props.watchAsset(props.user.id)}
        buyAction={(quantity) => props.buyNewAsset(props.user.id, quantity)} />
    );
  }
}

export default Sidebar;

