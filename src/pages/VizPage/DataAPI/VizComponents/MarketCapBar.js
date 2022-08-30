import React from 'react';
import Chart from "react-apexcharts";
import { Stack, Card, Text, Divider} from "@mantine/core";
export default function MarketCapBarChart({MarketCapData, globalCap, names}) {

  const newData = MarketCapData

  const chartState = {
      
    MarketSeries: [{
        data: newData
    }],
    MarketOptions: {
        chart: {
            id: "MarketBar",
            group: "MarketBar",
            type: 'bar',
            height: "100%",
            width: "100%"
        },
        plotOptions: {
          bar: {
            // borderRadius: 4,
            horizontal: true,
          }
        },
        title: {
            text: 'Select Cryptocurrency Shares of the Market',
            align: 'left'
        },
        yaxis: {
            // labels: {
            //   formatter: function (value) {
            //     return parseInt(value/1000000000) + "B$";
            //   }
            // },
            categories: names
        },
        xaxis: {
          // categories: names
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
			<Stack >
				<Text size='xl' align='center'>{parseFloat(globalCap/1000000000000).toFixed(3)} Trillion USD</Text>
			</Stack>
			<Divider my='md' size='xs' mx='sm'/>
			<Stack spacing={6}>
        <Chart
              options={chartState.MarketOptions}
              series={chartState.MarketSeries}
              type="bar"
              width="100%"
        />	
      </Stack>
		</Card>
    
  )
}
