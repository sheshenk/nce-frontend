import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko} from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";
import DeFiDonut from "./VizComponents/DefiDonut";

export default function DeFi() {
  const [DeFiData, setDeFiCapData] = useState(null);

  useEffect(() => {
    async function getDeFiCapData() {

      const cachedDeFiCapData = retrieveCache('DeFiCapData');

      if (cachedDeFiCapData) {
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

        const normalizedResponse = toCamelCase(response.data);
  
        // console.log("DEFI : ",normalizedResponse)
        
        const N = 6

        const topNdefi = normalizedResponse.slice(0, N);

        const defiData = []

        topNdefi.forEach(element => {
          defiData.push({
            x: element.name,
            y: element.marketCap,
          })
        });

        // console.log(defiData)
  
        cacheWithExpiry('DeFiCapData', defiData, 1200000); 
        console.log("DeFiCapData Fetched")
        setDeFiCapData(defiData)
      }

    }

    getDeFiCapData();

  }, []);

  if (!DeFiData) return "Data Loading"

  return(
    <div>
        <DeFiDonut Data={DeFiData}/>
    </div>
  );
}