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
              if (!data[i]) break;
            }
            if (data[i]) everyFiveMin.push(data[i]);
          }
          const color = everyFiveMin[everyFiveMin.length - 1].average
            < everyFiveMin[0].average ? "#ff3d12" : "#29c446";
          this.setState({ data: everyFiveMin, color });
        });
    }
  }

  render() {
    return (
      <LineChart width={680} height={300} data={this.state.data}>
        <Tooltip />
        <XAxis dataKey="label" hide={true} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Line type="monotone" dataKey="average" stroke={this.state.color} dot={false} strokeWidth={2}/>
      </LineChart>
    );
  }
}

export default AssetGraph;