import React from 'react';
import NewsIndexContainer from './news_index_container';
import Sidebar from './sidebar/sidebar';
import { updatePortfolio } from '../../actions/asset_actions';
import { connect } from 'react-redux';
import PortfolioGraph from './portfolio_graph';

class Portfolio extends React.Component {

  componentDidMount() {
    this.props.updatePortfolio(
      Object.keys(this.props.owned).concat(Object.keys(this.props.watched)),
      this.props.owned,
      this.props.buyingPower
    );
  }

  render() {
    const graphData = this.props.portfolioGraph;
    const valChange = graphData[graphData.length - 1].accountValue - graphData[0].accountValue;
    return (
      <main>
        <div className="portfolio-container">
          <section className="portfolio-main">
            <PortfolioGraph
              data={graphData}
              buyingPower={this.props.buyingPower}
              change={valChange}
              percentChange={(valChange / graphData[0].accountValue) * 100}
              value={graphData[graphData.length - 1].accountValue / 100} />
            <NewsIndexContainer />
          </section>
          <Sidebar />
        </div>
      </main>
    );
  }
}

const mSTP = state => ({
  owned: state.entities.ownedAssets,
  watched: state.entities.watchedAssets,
  buyingPower: state.session.currentUser.buyingPower,
  portfolioGraph: state.entities.portfolioGraph
});

const mDTP = dispatch => ({
  updatePortfolio: (tickers, ownedAssets, buyingPower) => 
    dispatch(updatePortfolio(tickers, ownedAssets, buyingPower))
});

export default connect(mSTP, mDTP)(Portfolio);