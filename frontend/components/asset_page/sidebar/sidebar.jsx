import React from 'react';
import BuyOrSellForm from './buy_or_sell_form';
import BuyOnlyForm from './buy_only_form';

class Sidebar extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = { successMsg: '', timeout: null };
    this.setSuccessMsg = this.setSuccessMsg.bind(this);
  }

  setSuccessMsg(msg) {
    if (this.state.timeout) clearTimeout(this.state.timeout);
    this.setState({ successMsg: msg });
    this.setState({ timeout: setTimeout(() => this.setState({ successMsg: '' }), 1500) });
  }

  componentWillUnmount() {
    if (this.state.timeout) clearTimeout(this.state.timeout);
  }

  render() {
    if (this.props.owned) {
      return (
        <div className="asset-sidebar-wrapper">
          <div className="success-msg">
            {this.state.successMsg}
          </div>
          <BuyOrSellForm
            asset={this.props.asset}
            buyingPower={this.props.user.buyingPower}
            quantity={this.props.owned.quantity}
            errors={this.props.errors}
            clearErrors={() => this.props.clearErrors()}
            setSuccessMessage={(msg) => this.setSuccessMsg(msg)}
            buyAsset={(quantBuying) => 
              this.props.buyAsset(
                this.props.user.id,
                this.props.owned.holdingId,
                this.props.owned.quantity,
                quantBuying
              )}
            sellAsset={(quantSelling) =>
              this.props.sellAsset(
                this.props.user.id,
                this.props.owned.holdingId,
                this.props.owned.quantity,
                quantSelling
              )} />
        </div>
      );
    } else if (this.props.watched) {
      return (
        <div className="asset-sidebar-wrapper">
          <div className="success-msg">
            {this.state.successMsg}
          </div>
          <BuyOnlyForm
            asset={this.props.asset}
            buyingPower={this.props.user.buyingPower}
            errors={this.props.errors}
            clearErrors={() => this.props.clearErrors()}
            watchedStatus="Watched"
            watchAction={() => this.props.unwatchAsset(this.props.watched.holdingId)}
            setSuccessMessage={(msg) => this.setSuccessMsg(msg)}
            buyAction={(quantity) =>
              this.props.buyAsset(
                this.props.user.id,
                this.props.watched.holdingId,
                0,
                quantity
              )} />
        </div>
      );
    } else {
      return (
        <div className="asset-sidebar-wrapper">
          <div className="success-msg">
            {this.state.successMsg}
          </div>
          <BuyOnlyForm
            asset={this.props.asset}
            buyingPower={this.props.user.buyingPower}
            errors={this.props.errors}
            clearErrors={() => this.props.clearErrors()}
            watchedStatus="Unwatched"
            watchAction={() => this.props.watchAsset(this.props.user.id)}
            setSuccessMessage={(msg) => this.setSuccessMsg(msg)}
            buyAction={(quantity) => this.props.buyNewAsset(this.props.user.id, quantity)} />
        </div>
      );
    }
  }
}

export default Sidebar;

