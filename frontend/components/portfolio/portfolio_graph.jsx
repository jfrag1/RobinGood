import React from 'react';
import { LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

class PortfolioGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value,
      netChange: props.change,
      perChange: props.percentChange
    };
  }

  handleMouseMove(lineData) {
    if (!lineData.isTooltipActive) return;
    this.setState({
      val: lineData.activePayload[0].value / 100,
      netChange: lineData.activePayload[0].value - this.props.data[0].accountValue,
      perChange: (lineData.activePayload[0].value / this.props.data[0].accountValue - 1) * 100
    })
  }



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
    const color = this.props.change < 0 ? "#ff3d12" : "#29c446";
    const sign = this.state.netChange < 0 ? "-" : "+";
    return (
      <div className="portfolio-graph-container">
        <header>
          {`$${(this.state.val)
            .toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
        </header>
        <div className="account-change">
          <span className="bold-me">
            {`${sign}$${Math.abs(this.state.netChange / 100).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
          </span>
          <span className="bold-me">
            {`(${sign}${Math.abs(this.state.perChange).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}%)`}
          </span>
          <span>Today</span>
        </div>
        <LineChart
          width={630}
          height={220}
          data={this.props.data}
          onMouseMove={(lineData) => this.handleMouseMove(lineData)}
          onMouseLeave={() => this.setState({
            val: this.props.value,
            netChange: this.props.change,
            perChange: this.props.percentChange
          })}>
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