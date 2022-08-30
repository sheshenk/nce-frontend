import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko } from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import TrendingCoinsTable from "./VizComponents/TrendingCoinsTable";

export default function TrendingCoinData() {
  const [TrendingCoin, setTrendingCoin] = useState(null);

  useEffect(() => {
    async function getTrendingCoinData() {

        const canceler = axios.CancelToken.source();

        const TrendingCoinsList = await http.request({
            ...coinGecko_API,
            url: coinGecko.trending,
            cancelToken: canceler.token
          });

        const normalizedTrendingCoinList = toCamelCase(TrendingCoinsList.data.coins);

        const TrendingCoinArr = [];

        // let start = 1;

        normalizedTrendingCoinList.forEach((coin) => {
            TrendingCoinArr.push({
                // Rank: start, 
                Name: coin.item.name,
                Symbol: coin.item.symbol
              });
            // start = start + 1;
        });

        console.log("TrendingData Ready")
        setTrendingCoin(TrendingCoinArr)
    }

    getTrendingCoinData();
  }, []);

  if (!TrendingCoin) return "Data Loading"

  return(
  <div>
    <TrendingCoinsTable CoinsData = {TrendingCoin}/>
  </div>
  );
}