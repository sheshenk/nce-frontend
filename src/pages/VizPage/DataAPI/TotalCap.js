import axios from "axios";
import React, {useState, useEffect} from "react";
import { coinGecko} from "./APIHelpers/endpoints";
import { http, coinGecko_API} from "./APIHelpers/APIconfig";
import { toCamelCase } from "./FormatHelpers/CaseHandler";
import MarketCapBarChart from "./VizComponents/MarketCapBar";
import { retrieveCache, cacheWithExpiry } from "./APIHelpers/Cachers";

export default function GlobalCapData() {
  const [GlobalCap, setGlobalCap] = useState(null);
  const [GlobalCapData, setGlobalCapData] = useState(null);

  useEffect(() => {
    async function getGlobalCapData() {

      const cachedGlobalCapData = retrieveCache('GlobalCapData');
      const cachedGlobalCap = retrieveCache('GlobalCap');

      if (cachedGlobalCap) {
        setGlobalCap(cachedGlobalCap)
        setGlobalCapData(cachedGlobalCapData)
        console.log("Used Global Cap cache")
      }
      else {
        const canceler = axios.CancelToken.source();

        const response = await http.request({
              ...coinGecko_API,
              url: coinGecko.global,
              cancelToken: canceler.token
            });
        
        const normalizedResponse = toCamelCase(response.data);
  
        const MarketCapData = normalizedResponse.data;
  
        const newData = [];
  
        const globalCap = parseFloat(MarketCapData.totalMarketCap.usd);
  
        const topcoins = MarketCapData.marketCapPercentage;
  
        const btc_cap = parseFloat(globalCap)*parseFloat(topcoins.btc)/100 ;
        const eth_cap = parseFloat(globalCap)*parseFloat(topcoins.eth)/100 ;
        const xrp_cap = parseFloat(globalCap)*parseFloat(topcoins.xrp)/100 ;
        const usdt_cap = parseFloat(globalCap)*parseFloat(topcoins.usdt)/100 ;
        const doge_cap = parseFloat(globalCap)*parseFloat(topcoins.doge)/100 ;
        const others =  parseFloat(globalCap) - btc_cap - eth_cap - xrp_cap - usdt_cap - doge_cap ;
        // console.log(btc_cap, eth_cap, xrp_cap, usdt_cap, doge_cap, others)
  
        newData.push({
          x: 'BTC',
          y: btc_cap,
          fillColor: '#f2a900'
        })
        newData.push({
          x: 'ETH',
          y: eth_cap,
          fillColor: '#215CAF'
        })
        newData.push({
          x: 'USDT',
          y: usdt_cap,
          fillColor: '#85bb65'
        })
        newData.push({
          x: 'XRP',
          y: xrp_cap,
          fillColor: '#00aae4'
        })
        newData.push({
          x: 'DOGE',
          y: doge_cap,
          fillColor: '#EB8C87'
        })
        newData.push({
          x: 'OTHERS',
          y: others,
          fillColor: '#000000'
        })
  
        cacheWithExpiry('GlobalCap', globalCap, 1200000);  // Cache Period: 20 minutes
        cacheWithExpiry('GlobalCapData', newData, 1200000); 
        console.log("GlobalCapData Fetched")
        setGlobalCap(globalCap)
        setGlobalCapData(newData)
      }

      
      
    }

    getGlobalCapData();

  }, []);

  if (!GlobalCap) return "Data Loading"

  return(
  <div>
    <div><MarketCapBarChart MarketCapData = {GlobalCapData} globalCap = {GlobalCap} names = {['BTC','ETH','USDT','XRP','DOGE','OTHERS']}/></div>
  </div>
  );
}