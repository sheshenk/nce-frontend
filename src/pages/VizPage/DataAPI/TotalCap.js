import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko} from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";
import MarketCapBarChart from "./VizComponents/MarketCapBar";

export default function GlobalCapData() {
  const [GlobalCap, setGlobalCap] = useState(null);

  useEffect(() => {
    async function getGlobalCapData() {

      const canceler = axios.CancelToken.source();

      const cachedData = retrieveCache('globalCoinData');

      if (cachedData) {
        setGlobalCap(cachedData)
        console.log("Used Global Cap cache")
      } else {

        console.log("START")

        const response = await http.request({
            ...coinGecko_API,
            url: coinGecko.global,
            cancelToken: canceler.token
          });
      
          const normalizedResponse = toCamelCase(response.data);

          cacheWithExpiry('globalCoinData', normalizedResponse, 1200000);  // Cache Period: 20 minutes
          console.log("Can't cache, using new cap data")
          setGlobalCap(normalizedResponse.data)
      }
      
    }

    getGlobalCapData();

  }, []);

  // console.log("GC",GlobalCap)

  if (!GlobalCap) return "No Data"

  return(
  <div>
    <div><MarketCapBarChart MarketCapData = {GlobalCap} Limit = {2}/></div>
  </div>
  );
}