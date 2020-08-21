export const fetchNews = (quant) => {
  return $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/aapl/news/last/${quant}?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  });
};