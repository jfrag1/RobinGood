import React from 'react';
import About from './about';
import AssetNewsIndex from './asset_news_index';
import SidebarContainer from './sidebar/sidebar_container';
import { fetchAsset } from '../../util/asset_util';

class AssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset: null };
  }

  componentDidMount() {
    fetchAsset(this.props.match.params.ticker.toUpperCase())
      .then((asset) => this.setState({ asset }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
      fetchAsset(this.props.match.params.ticker.toUpperCase())
        .then((asset) => this.setState({ asset }));
    }
  }

  render() {
    const sidebar = this.state.asset ?
      <SidebarContainer asset={this.state.asset} /> : null
    return (
      <main>
        <div className="asset-page-container">
          <div className="asset-page-main">
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