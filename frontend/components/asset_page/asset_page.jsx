import React from 'react';
import About from './about';
import AssetNewsIndex from './asset_news_index';
import SidebarContainer from './sidebar/sidebar_container';
import AssetGraph from './asset_graph';
import { fetchOneDayGraphData } from '../../util/external_api_util';
import { fetchAsset } from '../../util/asset_util';

class AssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset_id: null,
      asset_ticker: null,
      recentPrice: null,
      percentChange: null
    };
  }

  componentDidMount() {
    fetchAsset(this.props.match.params.ticker.toUpperCase())
      .then((asset) => this.setState({ asset_id: asset.id, asset_ticker: asset.ticker }))
      .then(() => fetchOneDayGraphData(this.state.asset_ticker))
      .then((data) => {
        let i = data.length - 1;
        while (!data[i].average) {
          i--;
        }
        const endOfDayPrice = data[i].average;
        let j = 0;
        while (!data[j].average) {
          j++;
        }
        const startOfDayPrice = data[j].average;
        this.setState({
          recentPrice: parseInt(endOfDayPrice * 100),
          percentChange: ((endOfDayPrice / startOfDayPrice) - 1) * 100
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
      fetchAsset(this.props.match.params.ticker.toUpperCase())
        .then((asset) => this.setState({ asset_id: asset.id, asset_ticker: asset.ticker }))
        .then(() => fetchOneDayGraphData(this.state.asset_ticker))
        .then((data) => {
          let i = data.length - 1;
          while (!data[i].average) {
            i--;
          }
          const endOfDayPrice = data[i].average;
          let j = 0;
          while (!data[j].average) {
            j++;
          }
          const startOfDayPrice = data[j].average;
          this.setState({
            recentPrice: parseInt(endOfDayPrice * 100),
            percentChange: ((endOfDayPrice / startOfDayPrice) - 1) * 100
          });
        });
    }
  }

  render() {
    const sidebar = this.state.recentPrice ?
      <SidebarContainer asset={{
        id: this.state.asset_id,
        ticker: this.state.asset_ticker,
        recentPrice: this.state.recentPrice,
        percentChange: this.state.percentChange
      }} /> : null
    return (
      <main>
        <div className="asset-page-container">
          <div className="asset-page-main">
            <AssetGraph ticker={this.props.match.params.ticker} />
            <About ticker={this.props.match.params.ticker} />
            <AssetNewsIndex ticker={this.props.match.params.ticker} />
          </div>
          {sidebar}
        </div>
      </main>
    );
  }
}

export default AssetPage;