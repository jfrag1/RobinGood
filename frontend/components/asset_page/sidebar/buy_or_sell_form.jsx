import React from 'react';

class Headers extends React.Component {
  render() {
    const [buyTabClass, sellTabClass] = this.props.active === "buy" ?
      ["form-tab active", "form-tab"] : ["form-tab", "form-tab active"];
    return (
      <div className="form-tabs">
        <div
          className={buyTabClass}
          onClick={() => this.props.onSelected("buy")}>
            Buy {this.props.ticker}
        </div>
        <div
          className={sellTabClass}
          onClick={() => this.props.onSelected("sell")}>
            Sell {this.props.ticker}
        </div>
      </div>
    );
  }
}

class BuyOrSellForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "buy",
      shares: '',
      validInput: false,
      inputErrorDisplay: false,
      estimatedCost: "$0.00",
    };
    this.selectTab = this.selectTab.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValid(input) {
    const inputInt = parseInt(input);
    if (inputInt === NaN || inputInt < 0) {
      return false;
    } else if (inputInt.toString() !== input.trim()) {
      return false;
    } else {
      return true;
    }
  }

  selectTab(type) {
    this.setState({ active: type, inputErrorDisplay: false });
    this.props.clearErrors();
  }

  handleInput(e) {
    const validInput = this.isValid(e.target.value);
    if (validInput) {
      this.setState({
        shares: e.target.value,
        validInput,
        inputErrorDisplay: false,
        estimatedCost: "$" +
          (this.props.asset.recentPrice * parseInt(e.target.value) / 100)
            .toLocaleString('en', { minimumFractionDigits: 2 })
      });
    } else {
      this.setState({
        shares: e.target.value,
        validInput,
        inputErrorDisplay: false,
        estimatedCost: "$0.00"
      });
    }
    this.props.clearErrors();
  }

  handleSubmit(e) {
    if (!this.state.validInput) {
      this.setState({ inputErrorDisplay: true });
    } else {
      const sharesSuccessText = parseInt(this.state.shares) === 1 ? "share" : "shares";
      if (this.state.active === 'buy') {
        this.props.buyAsset(parseInt(this.state.shares));
        this.props.setSuccessMessage(`You bought ${this.state.shares} ${sharesSuccessText} of ${this.props.asset.ticker}`);
      } else {
        this.props.sellAsset(parseInt(this.state.shares));
        this.props.setSuccessMessage(`You sold ${this.state.shares} ${sharesSuccessText} of ${this.props.asset.ticker}`);
      }
      if (this.state.timeout) clearTimeout(this.state.timeout);
    }
  }

  render() {
    const inputError = this.state.inputErrorDisplay ?
      (<span>Please enter a positive integer</span>) : null;

    const color = this.props.asset.percentChange < 0 ? "red" : "green";

    const [estimated, btnText] = this.state.active === "buy" ? 
      ["Cost", "Buy"] : ["Credit", "Sell"];

    const sharesText = this.props.quantity === 1 ? "Share" : "Shares";

    const relevantInfo = this.state.active === "buy" ?(
      <span>
        ${(this.props.buyingPower / 100)
          .toLocaleString('en', { minimumFractionDigits: 2 }) + " "}
        Buying Power Available
      </span>
    ) : (<span>{this.props.quantity} {sharesText} Available</span>);
    return (
      <aside className={`asset-page-sidebar ${color}`}>
        <Headers
          active={this.state.active}
          onSelected={this.selectTab}
          ticker={this.props.asset.ticker} />
        <div className="sidebar-form">
          <div className="sidebar-form-row">
            <span>Shares</span>
            <input
              type="text"
              value={this.state.shares}
              maxLength="5"
              placeholder="0"
              onChange={this.handleInput} />
          </div>
          <div className="sidebar-form-row">
            <span>Market Price</span>
            <span className="bold-me">
              ${(this.props.asset.recentPrice / 100)
                .toLocaleString('en', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="estimate">
            <span>Estimated {estimated}</span>
            <span>{this.state.estimatedCost}</span>
          </div>
          <button onClick={this.handleSubmit}>
            {`${btnText} ${this.props.asset.ticker}`}
          </button>
        </div>
        <div className="sidebar-form-errors">
          {inputError}
          {
            this.props.errors.map((error) => (<span>{error}</span>))
          }
        </div>
        <div className="relevant-info">
          {relevantInfo}
        </div>
      </aside>
    );
  }
}

export default BuyOrSellForm;
