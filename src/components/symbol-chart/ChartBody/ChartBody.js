import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BarSeries, CandlestickSeries, Chart, ChartCanvas, CrossHairCursor, EdgeIndicator, LineSeries, MouseCoordinateY, OHLCTooltip, XAxis, YAxis } from 'react-financial-charts'
import { MARKET_HISTORY_QUERY } from '../../../queries/market-history'
import { makeCanvasProps } from '../../../services/canvasProps'
import createWebSocket, { finchartOnMessage } from '../../../services/createWebSocket'
import { axisStyles, candleSeriesProps, lineSeriesProps, mainChartProps } from '../../../services/mainChartProps'
import { edgeIndicatorProps, mouseCoordinateYProps } from '../../../services/miscProps'
import { volumeChartProps, volumeSeriesProps } from '../../../services/volumeProps'

const ChartBody = ({symbol, interval, type}) => {
	
	const [finchartData, setFinchartData] = useState([])

	const { loading, error, data } = useQuery(MARKET_HISTORY_QUERY, {
		variables: { symbol }
	})
	
	useEffect(() => {
		try {
			
			if (data !== undefined && data.getMarketHistoryForSymbol) {
				const res = data.getMarketHistoryForSymbol.map(d => ({...d, time: new Date(parseInt(d.time))}))
				setFinchartData(res)
			}
		} catch (error) {}
		// return createWebSocket(`live_trades_${symbol}`, finchartOnMessage(interval, setFinchartData))
	}, [interval, symbol, loading, error, data])
	
	return (
		<ChartCanvas {...makeCanvasProps(finchartData)}>
			<Chart {...volumeChartProps}>
				<BarSeries {...volumeSeriesProps}/>
			</Chart>
			<Chart {...mainChartProps}>
				<XAxis {...axisStyles}/>
				<YAxis {...axisStyles}/>
				{ type === 'Line' ? <LineSeries {...lineSeriesProps}/> : <CandlestickSeries {...candleSeriesProps}/> }
				<MouseCoordinateY {...mouseCoordinateYProps}/>
				<EdgeIndicator {...edgeIndicatorProps}/>
				<OHLCTooltip origin={[24, 24]}/>
			</Chart>
			<CrossHairCursor/>
		</ChartCanvas>
		)
	}
	
	export default ChartBody