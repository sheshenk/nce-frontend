import React from 'react';
import Chart from "react-apexcharts";
import { Stack, Card, Text, Divider} from "@mantine/core";

export default function DeFiDonut({Data}) {

  const newData = Data

  // console.log("ND",newData)

  const chartState = {
      
    MarketSeries: [{
        data: newData
    }],
    MarketOptions: {
        chart: {
            id: "DeFi",
            group: "DeFi",
            type: 'bar',
            height: "100%",
            width: "100%"
        },
        title: {
            text: 'Top 6 DeFi Ecosystems',
            align: 'left'
        },
        yaxis: {
          // categories: names
          labels: {
            formatter: function (value) {
              return parseInt(value/1000000000);
            }
          },
          title: {
            text: 'Market Cap (Bilions USD)',
            style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: "MuseoModerno, Arial, sans-serif" ,
              fontWeight: 250,
          },
          },
        },
        dataLabels: {
          enabled: false
        },
        fill: {
            type: 'gradient' 
          },
        legend: {
          show: false
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
              
              // return '<ul>' +
              // '<li><b>Ecosystem</b>: ' + data.x + '</li>' +
              // '<li><b>Value</b>: ' + parseFloat(data.y/1000000000).toFixed(3).toString() +' B $ </li>' +
              // '</ul>';
              return data.x + ' = ' + parseFloat(data.y/1000000000).toFixed(3).toString() +' B $';
            }
        },
    },

    };

  return (
    // <div>
    //     <div>Crypto Market Cap : {parseFloat(globalCap/1000000000000).toFixed(3)} Trillion USD</div>
    //     <div id='chart_hash'>
    //         <Chart
    //           options={chartState.MarketOptions}
    //           series={chartState.MarketSeries}
    //           type="bar"
    //           width="100%"
    //         />
    //     </div>
    // </div>
    <Card>
        <Chart
              options={chartState.MarketOptions}
              series={chartState.MarketSeries}
              type="bar"
              width="100%"
        />	
	</Card>
    
  )
}
