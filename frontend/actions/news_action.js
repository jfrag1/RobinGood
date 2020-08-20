import { fetchNews } from '../util/external_api_util';

export const RECEIVE_NEWS = 'RECEIVE_NEWS';

const receiveNews = (news) => ({
  type: RECEIVE_NEWS,
  news
});

export const requestNews = (quant) => dispatch => (
  fetchNews(quant)
    .then((news) => dispatch(receiveNews(news)))
);