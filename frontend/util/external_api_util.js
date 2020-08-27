export const fetchNews = (quant) => {
  return $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/aapl/news/last/${quant}?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  });
};

export const fetchCompanyData = (ticker) => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  })
);

export const fetchCompanyNews = (ticker) => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/${ticker.toLowerCase()}/news/last/8?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  })
);

export const fetchOneDayGraphData = (ticker) => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/${ticker.toLowerCase()}/intraday-prices?token=${window.cloudiexAPIKey}`,
    method: 'GET'
  })
);