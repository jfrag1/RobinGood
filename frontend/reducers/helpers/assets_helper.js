export const getPricesAndChange = (tickerKeyToData) => {
  return Object.keys(tickerKeyToData).map((ticker) => {
    const mapTo = { ticker };
    const data = tickerKeyToData[ticker].responseJSON;
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
    mapTo['recentPrice'] = parseInt(endOfDayPrice * 100);
    mapTo['percentChange'] = ((endOfDayPrice / startOfDayPrice) - 1) * 100;
    return mapTo;
  });
}