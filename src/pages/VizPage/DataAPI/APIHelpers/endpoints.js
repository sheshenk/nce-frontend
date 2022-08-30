

export const ethGasStation = {
  gasOracle:
    `/json/ethgasAPI.json`
};

export const alternativeMe = {
  fearGreedIndex: (days) =>
    `/fng/?limit=${days}`,
  topCoins: ()=>
    `/v2/ticker/?limit=$0`
};

export const blockchainCom = {
  bitcoinHashRate:
    `/charts/hash-rate?daysAverageString=7D&timespan=1year&sampled=true&metadata=false&cors=true&format=json`
};

export const coinGecko = {
  coins: (sortingKey, sortingOrder, page, perPage, sparkline, category) =>
    `/coins/markets?vs_currency=usd&order=${sortingKey}_${sortingOrder}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h,7d${category ? `&category=${category}` : ''}`,
  coinMarketChart: (coinId, days, interval) =>
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending:
    `/search/trending`,
  global:
    `/global`,
  coinDetails: (coinId) =>
    `/coins/${coinId}`,
  supportedCoins:
    `/coins/list`,
  categories:
    `/coins/categories/list`,
  exchanges: (page, perPage) =>
    `/exchanges?per_page=${perPage}&page=${page}`,
  exchangeVolumeChart: (exchangeId, days) =>
    `/exchanges/${exchangeId}/volume_chart?days=${days}`,
  companies: (coinId) =>
    `/companies/public_treasury/${coinId}`,
  statusUpdates: (page, perPage, category) =>
    `/status_updates?per_page=${perPage}&page=${page}&category=${category}`,
  defi: 
    `/coins/categories`,
  defi_global:
    `/global/decentralized_finance_defi`,
};