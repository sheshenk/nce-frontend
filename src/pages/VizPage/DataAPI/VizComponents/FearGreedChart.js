import React from 'react';
import Chart from "react-apexcharts";
import { Stack, SimpleGrid, Container } from "@mantine/core"

export default function FearGreedChart({ fearGreedIndex }) {

  const fearData = fearGreedIndex.map(d => ({ x: parseInt(d.timestamp) * 1000, y: Number(d.value), classification: d.valueClassification, datestring: new Date(parseInt(d.timestamp * 1000)).toLocaleDateString('pt-PT') }))
  const BTCData = fearGreedIndex.map(d => ({ x: parseInt(d.timestamp) * 1000, y: parseFloat(d.bitcoinPrice), datestring: new Date(parseInt(d.timestamp * 1000)).toLocaleDateString('pt-PT') }))
  const ETHData = fearGreedIndex.map(d => ({ x: parseInt(d.timestamp) * 1000, y: parseFloat(d.ETHPrice), datestring: new Date(parseInt(d.timestamp * 1000)).toLocaleDateString('pt-PT') }))
  const XRPData = fearGreedIndex.map(d => ({ x: parseInt(d.timestamp) * 1000, y: parseFloat(d.XRPPrice), datestring: new Date(parseInt(d.timestamp * 1000)).toLocaleDateString('pt-PT') }))
  //   console.log(fearData)

  const chartState = {

    fearSeries: [{
      data: fearData
    }],
    fearOptions: {
      chart: {
        id: "Fear",
        group: "FearBTC",
        type: 'line',
        height: 160
      },
      title: {
        text: 'Fear and Greed Index',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Fear',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: "MuseoModerno, Arial, sans-serif",
            fontWeight: 250,
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          // return '<ul>' +
          // '<li><b>Date</b>: ' + data.datestring + '</li>' +
          // '<li><b>Fear Value</b>: ' + data.y + '</li>' +
          // '<li><b>classification</b>: \'' + data.classification + '\'</li>' +
          // '</ul>';
          return data.y + ' : ' + data.classification
        }
      },
      colors: ['#85bb65']
    },

    BTCSeries: [{
      data: BTCData
    }],
    BTCOptions: {
      chart: {
        id: "BTC",
        group: "FearBTC",
        type: 'line',
        height: 160
      },
      title: {
        text: 'BTC Price',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return parseInt(value / 1000);
          }
        },
        title: {
          text: 'Price (10k $)',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: "MuseoModerno, Arial, sans-serif",
            fontWeight: 250,
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          // return '<ul>' +
          // '<li><b>Date</b>: ' + data.datestring + '</li>' +
          // '<li><b>BTC Price</b>: ' + parseInt(data.y) + '</li>' +
          // '</ul>';
          return 'BTC Price = ' + parseInt(data.y) + ' $'
        }
      },
      colors: ['#f2a900']
    },

    ETHSeries: [{
      data: ETHData
    }],
    ETHOptions: {
      chart: {
        id: "ETH",
        group: "FearBTC",
        type: 'line',
        height: 160
      },
      title: {
        text: 'ETH Price',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return parseInt(value / 1000);
          },
        },
        title: {
          text: 'Price (1k $)',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: "MuseoModerno, Arial, sans-serif",
            fontWeight: 250,
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          // return '<ul>' +
          // '<li><b>Date</b>: ' + data.datestring + '</li>' +
          // '<li><b>ETH Price</b>: ' + parseInt(data.y) + '</li>' +
          // '</ul>';
          return 'ETH Price = ' + parseInt(data.y) + ' $'
        }
      },
      colors: ['#215CAF']
    },

    XRPSeries: [{
      data: XRPData
    }],
    XRPOptions: {
      chart: {
        id: "XRP",
        group: "FearBTC",
        type: 'line',
        height: 160
      },
      title: {
        text: 'XRP Price',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return parseFloat(value).toFixed(2);
          },

        },
        title: {
          text: 'Price ($)',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: "MuseoModerno, Arial, sans-serif",
            fontWeight: 250,
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          // return '<ul>' +
          // '<li><b>Date</b>: ' + data.datestring + '</li>' +
          // '<li><b>XRP Price</b>: ' + parseFloat(data.y).toFixed(2) + '</li>' +
          // '</ul>';
          return 'XRP Price = ' + parseFloat(data.y).toFixed(4) + ' $'
        }
      },
      colors: ['#00aae4']
    },

  };

  return (
    <Container style={{ width: '100%' }}>
      <SimpleGrid cols={2}>
        <Stack>
          <div>
            <div id='chart_fear'>
              <Chart
                options={chartState.fearOptions}
                series={chartState.fearSeries}
                type="line"
                width="100%"
              />
            </div>
            <div id='chart_BTC'>
              <Chart
                options={chartState.BTCOptions}
                series={chartState.BTCSeries}
                type="line"
                width="100%"
              />
            </div>
          </div>
        </Stack>
        <Stack>
          <div>
            <div id='chart_ETH'>
              <Chart
                options={chartState.ETHOptions}
                series={chartState.ETHSeries}
                type="line"
                width="100%"
              />
            </div>
            <div id='chart_XRP'>
              <Chart
                options={chartState.XRPOptions}
                series={chartState.XRPSeries}
                type="line"
                width="100%"
              />
            </div>
          </div>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
