import React from 'react';
import { LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

class PortfolioGraph extends React.Component {

  render() {
    if (this.props.data.length === 0) return (
      <div className="portfolio-graph-container">
        <header>
          {`$${(this.props.buyingPower / 100)
            .toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
        </header>
        <p>Welcome to RobinGood! Use this fake money to buy some stocks. You will then be able to see a graph of your portfolio value right here.</p>
      </div>
    );
    const valueChange = this.props.data[this.props.data.length - 1].accountValue -
      this.props.data[0].accountValue;
    const percentChange = (valueChange / this.props.data[0].accountValue) * 100;
    const [color, sign] = valueChange < 0 ? ["#ff3d12", "-"] : ["#29c446", "+"];
    return (
      <div className="portfolio-graph-container">
        <header>
          {`$${(this.props.data[this.props.data.length - 1].accountValue / 100)
            .toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
        </header>
        <div className="account-change">
          <span className="bold-me">
            {`${sign}$${Math.abs(valueChange / 100).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
          </span>
          <span className="bold-me">
            {`(${sign}${Math.abs(percentChange).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}%)`}
          </span>
          <span>Today</span>
        </div>
        <LineChart width={630} height={220} data={this.props.data}>
          <Tooltip
            offset={0}
            isAnimationActive={false}
            allowEscapeViewBox={{x: true, y: true}}
            position={{x: 'auto', y: 80}} />
          <XAxis dataKey="label" hide={true} />
          <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
          <Line
            type="monotone"
            dataKey="accountValue"
            stroke={color}
            dot={false}
            strokeWidth={2} />
        </LineChart>
      </div>
    );
  }
}

export default PortfolioGraph;