import React from 'react';
import NewsIndexContainer from './news_index_container';
import Sidebar from './sidebar/sidebar';
import { updatePortfolio } from '../../actions/asset_actions';
import { connect } from 'react-redux';

class Portfolio extends React.Component {

  componentDidMount() {
    console.log("portfolio mounted");
    // console.log(Object.keys(this.props.owned).concat(Object.keys(this.props.watched)));
    this.props.updatePortfolio(Object.keys(this.props.owned).concat(Object.keys(this.props.watched)));
  }

  componentDidUpdate() {
    console.log("portfolio updated");
  }


  render() {
    return (
      <main>
        <div className="portfolio-container">
          <section className="portfolio-main">
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
  watched: state.entities.watchedAssets
});

const mDTP = dispatch => ({
  updatePortfolio: (tickers) => dispatch(updatePortfolio(tickers))
});

export default connect(mSTP, mDTP)(Portfolio);
// export default Portfolio;