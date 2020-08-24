import { connect } from 'react-redux';
import { requestNews } from '../../actions/news_action';
import NewsIndex from './news_index';

const mSTP = state => ({
  stories: state.entities.news
});

const mDTP = dispatch => ({
  requestNews: () => dispatch(requestNews(7))
});

export default connect(mSTP, mDTP)(NewsIndex);