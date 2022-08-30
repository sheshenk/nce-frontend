import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko} from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import MarketCapBarChart from "./VizComponents/MarketCapBar";
import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";

export default function DeFi() {
  const [DeFiCap, setDeFiCap] = useState(null);
  const [DeFiData, setDeFiCapData] = useState(null);

  useEffect(() => {
    async function getDeFiCapData() {

      const cachedDeFiCapData = retrieveCache('DeFiCapData');
      const cachedDeFiCap = retrieveCache('DeFiCap');

      if (cachedDeFiCap) {
        setDeFiCap(cachedDeFiCap)
        setDeFiCapData(cachedDeFiCapData)
        console.log("Used DeFi Cap cache")
      }
      else {
        const canceler = axios.CancelToken.source();

        const response = await http.request({
              ...coinGecko_API,
              url: coinGecko.defi,
              cancelToken: canceler.token
            });

        const globalDeFi = await http.request({
                ...coinGecko_API,
                url: coinGecko.defi_global,
                cancelToken: canceler.token
        });

        const global_defi_cap = globalDeFi.data.data.defi_market_cap

        console.log(global_defi_cap)
        
        const normalizedResponse = toCamelCase(response.data);
  
        console.log("DEFI : ",normalizedResponse)
  
        // cacheWithExpiry('DeFiCap', DeFiCap, 1200000);  // Cache Period: 20 minutes
        // cacheWithExpiry('DeFiCapData', newData, 1200000); 
        // console.log("DeFiCapData Fetched")
        // setDeFiCap(DeFiCap)
        // setDeFiCapData(newData)
      }

      
      
    }

    getDeFiCapData();

  }, []);

  if (!DeFi) return "Data Loading"

  return(
    <div>
        DEFI
    </div>
  );
}