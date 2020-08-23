import { connect } from 'react-redux';
import StockIndex from './stock_index';

const mSTP = state => ({
  stocks: Object.values(state.entities.ownedAssets)
});

export default connect(mSTP)(StockIndex);