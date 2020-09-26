import React from 'react';

class BuyOnlyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: '',
      validInput: false,
      inputErrorDisplay: false,
      estimatedCost: "$0.00"
    };
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
      this.props.buyAction(parseInt(this.state.shares));
      this.props.setSuccessMessage(`You bought ${this.state.shares} ${sharesSuccessText} of ${this.props.asset.ticker}`);
    }
  }

  render() {
    const inputError = this.state.inputErrorDisplay ?
      (<span>Please enter a positive integer</span>) : null;

    const color = this.props.asset.percentChange < 0 ? "red" : "green";

    const watchButton = this.props.watchedStatus === "Watched" ?
      `Unwatch ${this.props.asset.ticker}` :
      `Watch ${this.props.asset.ticker}`;

    return (
      <aside className={`asset-page-sidebar ${color}`}>
        <div className="buy-form-header">
          <header>{`Buy ${this.props.asset.ticker}`}</header>
          <button onClick={() => this.props.watchAction()}>{watchButton}</button>
        </div>
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
            <span>Estimated Cost</span>
            <span>{this.state.estimatedCost}</span>
          </div>
          <button onClick={this.handleSubmit}>
            {`Buy ${this.props.asset.ticker}`}
          </button>
        </div>
        <div className="sidebar-form-errors">
          {inputError}
          {
            this.props.errors.map((error) => (<span>{error}</span>))
          }
        </div>
        <div className="relevant-info">
          <span>
            ${(this.props.buyingPower / 100)
              .toLocaleString('en', { minimumFractionDigits: 2 }) + " "}
            Buying Power Available
          </span>
        </div>
      </aside>
    );
  }
}

export default BuyOnlyForm;