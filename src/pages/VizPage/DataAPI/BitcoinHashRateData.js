import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko, blockchainCom } from "./APIHelpers/endpoints";
import { http, coinGecko_API, blockchain_API } from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
// import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";
import HashChart from "./VizComponents/BTCHashChart";

export default function BitcoinHashRateData() {
  const [BTCHash, setBTCHash] = useState(null);

  useEffect(() => {
    async function getBTCHashData() {

      const canceler = axios.CancelToken.source();

      // const cachedData = retrieveCache('bitcoinHashRate');

      // if (cachedData) {
      //   // return cachedData;
      //   setBTCHash(cachedData)
      //   console.log("Used Hash cache")
      // } else {

      //   console.log("START")

        const response = await http.request({
          ...blockchain_API,
          url: blockchainCom.bitcoinHashRate,
          cancelToken: canceler.token
        });
    
        const bitcoinMarketChart = await http.request({
          ...coinGecko_API,
          url: coinGecko.coinMarketChart('bitcoin', 365, 'daily'),
          cancelToken: canceler.token
        });
    
        const normalizedResponse = toCamelCase(response.data);
        
        const normalizedBitcoinMarketChart = toCamelCase(bitcoinMarketChart.data);
        normalizedResponse.values.forEach((hashRateData, index) => {
          hashRateData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
        });
    
        // cacheWithExpiry('bitcoinHashRate', normalizedResponse.values, 3600000);  // Cache Period: 1 hour
    
        // return normalizedResponse.values
        console.log("Can't cache, using new hash rate data")
        setBTCHash(normalizedResponse.values)
      // }
      
    }

    getBTCHashData();

  }, []);

  if (!BTCHash) return "No Data"

  return(
  <div>
    <div><HashChart HashData = {BTCHash}/></div>
  </div>
  );
}