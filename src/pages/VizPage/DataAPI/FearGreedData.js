import axios from "axios";
import React, {useState, useEffect} from "react";
import { alternativeMe, coinGecko } from "./APIHelpers/endpoints";
import { http, alternative_Me_API, coinGecko_API } from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import FearGreedChart from "./VizComponents/FearGreedChart";
import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";

export default function FearGreedData() {
  const [fear, setFear] = useState(null);

  useEffect(() => {
    async function getFearData() {

      const cachedData = retrieveCache('FearGreedData');

      if (cachedData) {
        setFear(cachedData)
        console.log("Used Fear cache")
      } else {

        const canceler = axios.CancelToken.source();

        const dayRange = 365;

        const FearData = await http.request({
          ...alternative_Me_API,
          url: alternativeMe.fearGreedIndex(dayRange),
          cancelToken: canceler.token
        });

        const bitcoinMarketData = await http.request({
          ...coinGecko_API,
          url: coinGecko.coinMarketChart('bitcoin', dayRange, 'daily'),
          cancelToken: canceler.token
        });

        const normalizedResponse = toCamelCase(FearData.data);

        normalizedResponse.data.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

        const normalizedBitcoinMarketChart = toCamelCase(bitcoinMarketData.data);

        normalizedResponse.data.forEach((indexData, index) => {
          indexData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
        });

        const ethereumMarketData = await http.request({
          ...coinGecko_API,
          url: coinGecko.coinMarketChart('ethereum', dayRange, 'daily'),
          cancelToken: canceler.token
        });

        // console.log("ETH",ethereumMarketData)

        const normalizedEthereumMarketChart = toCamelCase(ethereumMarketData.data);

        normalizedResponse.data.forEach((indexData, index) => {
          indexData.ETHPrice = normalizedEthereumMarketChart.prices[index][1];
        });

        const XRPMarketData = await http.request({
          ...coinGecko_API,
          url: coinGecko.coinMarketChart('ripple', dayRange, 'daily'),
          cancelToken: canceler.token
        });

        // console.log("XRP",XRPMarketData)

        const normalizedXRPMarketChart = toCamelCase(XRPMarketData.data);

        normalizedResponse.data.forEach((indexData, index) => {
          indexData.XRPPrice = normalizedXRPMarketChart.prices[index][1];
        });

        // console.log("NR : ",normalizedResponse)

        const FinalResponse = normalizedResponse.data.map(
          ({ value, valueClassification, timestamp, bitcoinPrice, ETHPrice, XRPPrice , ...del_attrs }) => 
          ({ value, valueClassification, timestamp, bitcoinPrice, ETHPrice, XRPPrice })
        );

        cacheWithExpiry('FearGreedData', FinalResponse, 1200000);  // Cache Period: 20 minutes
      
        console.log("Can't cache, using new fear greed data")
        console.log("FearData Fetched")
        setFear(FinalResponse)

      }
    }

    getFearData();
  }, []);

  if (!fear) return "Data Loading"

  return(
  <div>
    <FearGreedChart fearGreedIndex = {fear}/>
  </div>
  );
}