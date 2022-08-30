import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko } from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import TopCoinsTable from "./VizComponents/TopCoinsTable";

export default function Top10CoinData() {
  const [TopCoin, setTopCoin] = useState(null);

  useEffect(() => {
    async function getTopCoinData() {

        const canceler = axios.CancelToken.source();

        const limit = 10;

        const topCoinsList = await http.request({
            ...coinGecko_API,
            url: coinGecko.coins('market_cap', 'desc', 1, limit, false, ''),
            cancelToken: canceler.token
          });

        const normalizedTopCoinList = toCamelCase(topCoinsList.data);

        const topCoinArr = [];

        let start = 1;

        normalizedTopCoinList.forEach((coin) => {
            topCoinArr.push({
                Rank: start, 
                Name: coin.id.toUpperCase(),
                Symbol: coin.symbol.toUpperCase(),
                MarketCap_Billions_USD: parseFloat(coin.marketCap/1000000000).toFixed(3),
                Price_USD: parseFloat(coin.currentPrice).toFixed(3),
                ChangePercent24h: parseFloat(coin.priceChangePercentage24H).toFixed(3),
              });
            start = start + 1;
        });

        console.log("TopCoinData Ready")
        setTopCoin(topCoinArr)

    }

    console.log("Loading Global Top Coins Data")
    getTopCoinData();
  }, []);

  if (!TopCoin) return "Data Loading"

  return(
  <div>
    <TopCoinsTable CoinsData = {TopCoin}/>
  </div>
  );
}