import React from 'react';
import Chart from "react-apexcharts";

export default function MarketCapBarChart({MarketCapData, Limit}) {

  // console.log(MarketCapData, Limit)

  const newData = [];

  const globalCap = parseFloat(MarketCapData.data.totalMarketCap.usd)
  // console.log(globalCap)

  const topcoins = MarketCapData.data.marketCapPercentage
  // console.log(topcoins)

  const btc_cap = parseFloat(globalCap)*parseFloat(topcoins.btc)/100 
  const eth_cap = parseFloat(globalCap)*parseFloat(topcoins.eth)/100 
  const xrp_cap = parseFloat(globalCap)*parseFloat(topcoins.xrp)/100
  const usdt_cap = parseFloat(globalCap)*parseFloat(topcoins.usdt)/100
  const doge_cap = parseFloat(globalCap)*parseFloat(topcoins.doge)/100
  const others =  parseFloat(globalCap) - btc_cap - eth_cap - xrp_cap - usdt_cap - doge_cap
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

  const chartState = {
      
    MarketSeries: [{
        data: newData
    }],
    MarketOptions: {
        chart: {
            id: "MarketBar",
            group: "MarketBar",
            type: 'bar',
            height: 160
        },
        title: {
            text: 'Market Capitalization by Bar',
            align: 'left'
        },
        yaxis: {
            labels: {
              formatter: function (value) {
                return parseInt(value/1000000000) + "B$";
              }
            },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
              
              return '<ul>' +
              '<li><b>Coin</b>: ' + data.x + '</li>' +
              '<li><b>Market Cap</b>: ' + parseFloat(data.y/1000000000).toFixed(3).toString() +' B $ </li>' +
              '</ul>';
            }
        },
    },

    };

  return (
    <div>
        <div>Crypto Market Cap : {parseFloat(globalCap/1000000000000).toFixed(3)} Trillion USD</div>
        <div id='chart_hash'>
            <Chart
              options={chartState.MarketOptions}
              series={chartState.MarketSeries}
              type="bar"
              width="500"
            />
        </div>
    </div>
    
  )
}
