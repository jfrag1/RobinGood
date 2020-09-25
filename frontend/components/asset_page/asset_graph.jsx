import React from 'react';
import { fetchOneDayGraphData } from '../../util/external_api_util';
import { LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

class AssetGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, color: null, val: 0, netChange: 0, perChange: 0 };
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
    if (this.props.price !== prevProps.price) {
      this.setState({
        val: this.props.price / 100,
        netChange: this.props.change,
        perChange: this.props.percentChange
      });
    }
  }

  updateVal(lineData) {
    if (lineData === null) return;
    if (lineData.activePayload === undefined) return;
    this.setState({
      val: lineData.activePayload[0].value,
      netChange: lineData.activePayload[0].value - this.state.data[0].average,
      perChange: (lineData.activePayload[0].value / this.state.data[0].average - 1) * 100
    });
  }

  render() {
    const sign = this.state.netChange < 0 ? '-' : '+';
    
    return (
      <div className="asset-graph-container">
        <div className="company-name">{this.props.name}</div>
        <header>
          {`$${(this.state.val)
            .toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
        </header>
        <div className="asset-change">
          <span className="bold-me">
            {`${sign}$${Math.abs(this.state.netChange).toLocaleString(
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
          data={this.state.data}
          onMouseMove={(lineData) => this.updateVal(lineData)}
          onMouseLeave={() => this.setState({
            val: this.props.price / 100,
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
            dataKey="average"
            stroke={this.state.color}
            dot={false} strokeWidth={2} />
        </LineChart>
      </div>
    );
  }
}

export default AssetGraph;