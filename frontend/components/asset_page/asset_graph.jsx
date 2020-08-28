import React from 'react';
import { fetchOneDayGraphData } from '../../util/external_api_util';
import { LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

class AssetGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, color: null };
  }

  componentDidMount() {
    fetchOneDayGraphData(this.props.ticker)
      .then((data) => {
        const everyFiveMin = [];
        for (let i = 0; i < data.length; i += 5) {
          while (!data[i].average) {
            i++;
          }
          everyFiveMin.push(data[i]);
        }
        let i = data.length - 1;
        while(!data[i].average) {
          i--;
        }
        if (data[i].minute !== everyFiveMin[everyFiveMin.length - 1].minute) {
          everyFiveMin.push(data[i])
        }
        const color = everyFiveMin[everyFiveMin.length - 1].average
            < everyFiveMin[0].average ? "#ff3d12" : "#29c446";
        this.setState({ data: everyFiveMin, color });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      fetchOneDayGraphData(this.props.ticker)
        .then((data) => {
          const everyFiveMin = [];
        for (let i = 0; i < data.length; i += 5) {
          while (!data[i].average) {
            i++;
          }
          everyFiveMin.push(data[i]);
        }
        let i = data.length - 1;
        while(!data[i].average) {
          i--;
        }
        if (data[i].minute !== everyFiveMin[everyFiveMin.length - 1].minute) {
          everyFiveMin.push(data[i])
        }
          const color = everyFiveMin[everyFiveMin.length - 1].average
            < everyFiveMin[0].average ? "#ff3d12" : "#29c446";
          this.setState({ data: everyFiveMin, color });
        });
    }
  }

  render() {
    const change = this.state.data ? 
      this.state.data[this.state.data.length - 1].average - this.state.data[0].average : 0;
    const sign = change < 0 ? '-' : '+';
    
    return (
      <div className="asset-graph-container">
        <div className="company-name">{this.props.name}</div>
        <header>
          {`$${(this.props.price / 100)
            .toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
        </header>
        <div className="asset-change">
          <span className="bold-me">
            {`${sign}$${Math.abs(change).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
          </span>
          <span className="bold-me">
            {`(${sign}${Math.abs(this.props.percentChange).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}%)`}
          </span>
          <span>Today</span>
        </div>
        <LineChart width={630} height={220} data={this.state.data}>
          <Tooltip
            offset={0}
            isAnimationActive={false}
            allowEscapeViewBox={{x: true, y: true}}
            position={{x: 'auto', y: 80}} />
          <XAxis dataKey="label" hide={true} />
          <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
          <Line
            type="monotone"
            dataKey="average"
            stroke={this.state.color}
            dot={false} strokeWidth={2} />
        </LineChart>
      </div>
    );
  }
}

export default AssetGraph;