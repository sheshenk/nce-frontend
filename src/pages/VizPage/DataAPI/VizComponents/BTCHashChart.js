import React from 'react';
import Chart from "react-apexcharts";

export default function HashChart({HashData}) {

  const hashData = HashData.map(d => ({x: parseInt(d.x)*1000, y: Number(d.y), datestring: new Date(parseInt(d.x * 1000)).toLocaleDateString('pt-PT') }))
  
  const chartState = {
      
    HashSeries: [{
        data: hashData
    }],
    HashOptions: {
        chart: {
            id: "Hash",
            group: "HashRate",
            type: 'line',
            height: 160
        },
        title: {
            text: 'Hash Rate',
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            labels: {
              formatter: function (value) {
                return parseInt(value/1000000) + "M Hashes/Block";
              }
            },
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
              
              return '<ul>' +
              '<li><b>Date</b>: ' + data.datestring + '</li>' +
              '<li><b>Hash Rate</b>: ' + data.y + '</li>' +
              '</ul>';
            }
        },
        colors: ['#F08080']
    },

    };

  return (
    <div>
        <div id='chart_hash'>
            <Chart
              options={chartState.HashOptions}
              series={chartState.HashSeries}
              type="line"
              width="500"
            />
        </div>
    </div>
    
  )
}
