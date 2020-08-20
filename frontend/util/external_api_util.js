export const fetchNews = (quant) => (
  $.ajax({
    url: `https://sandbox.iexapis.com/stable/stock/aapl/news/last/${quant}?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  })
);