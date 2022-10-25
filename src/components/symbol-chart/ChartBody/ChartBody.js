// import { useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BarSeries, CandlestickSeries, Chart, ChartCanvas, CrossHairCursor, EdgeIndicator, LineSeries, MouseCoordinateY, OHLCTooltip, XAxis, YAxis } from 'react-financial-charts'
// import { MARKET_HISTORY_QUERY, MARKET_HISTORY_SUBSCRIPTION } from '../../../queries/market-history'
// import { REAL_MARKET_HISTORY_QUERY } from '../../../queries/realMarketHistory'
// import { NEW_ORDER_FILLED_SUBSCRIPTION } from '../../../queries/order-fillings'
import { makeCanvasProps } from '../../../services/canvasProps'
// import { finchartOnMessage } from '../../../services/createWebSocket'
import { axisStyles, candleSeriesProps, lineSeriesProps, mainChartProps } from '../../../services/mainChartProps'
import { edgeIndicatorProps, mouseCoordinateYProps } from '../../../services/miscProps'
import { volumeChartProps, volumeSeriesProps } from '../../../services/volumeProps'
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Text } from '@mantine/core'

const ChartBody = ({ symbol, interval, type }) => {
	const [finchartData, setFinchartData] = useState([])
	const { sendJsonMessage, readyState } = useWebSocket("ws://localhost:8000/realmarkethistory",
		{
			onOpen: () => sendJsonMessage({ product_id: symbol.toUpperCase() }),
			//Will attempt to reconnect on all close events, such as server shutting down
			shouldReconnect: (closeEvent) => true,
			onMessage: (e) => {
				if (e.data !== null) {
					let res = JSON.parse(e.data)
					if (res.symbol === symbol.toUpperCase()) {
						switch (res.type) {
							case "snapshot":
								console.log(res)
								setFinchartData(res.market_history.map(d => ({ ...d, time: new Date(parseInt(d.time)) })))
								break;
							case "add_candlestick":
								console.log(res)
								finchartData.pop()
								finchartData.push({ ...res.candlestick, time: new Date(parseInt(res.candlestick.time)) })
								finchartData.push({
									time: new Date(),
									open: res.candlestick.close,
									close: res.candlestick.close,
									high: res.candlestick.close,
									low: res.candlestick.close,
									vloume: 0
								})
								setFinchartData([...finchartData])
								break;
							case "update_candlestick":
								console.log(res)
								finchartData.pop()
								finchartData.push({ ...res.candlestick, time: new Date(parseInt(res.candlestick.time)) })
								setFinchartData([...finchartData])
								break;
							default:
								break;
						}
					}
				}
			}
		});

	if (readyState === ReadyState.OPEN) {
		return (
			< ChartCanvas {...makeCanvasProps(finchartData)}>
				<Chart {...volumeChartProps}>
					<BarSeries {...volumeSeriesProps} />
				</Chart>
				<Chart {...mainChartProps}>
					<XAxis {...axisStyles} />
					<YAxis {...axisStyles} />
					{type === 'Line' ? <LineSeries {...lineSeriesProps} /> : <CandlestickSeries {...candleSeriesProps} />}
					<MouseCoordinateY {...mouseCoordinateYProps} />
					<EdgeIndicator {...edgeIndicatorProps} />
					<OHLCTooltip origin={[24, 24]} />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas >
		)
	} else {
		return (<Text>Loading...</Text>)
	}
}

export default ChartBody