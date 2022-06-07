import { useEffect, useState } from 'react'
import { BarSeries, CandlestickSeries, Chart, ChartCanvas, CrossHairCursor, EdgeIndicator, LineSeries, MouseCoordinateY, OHLCTooltip, XAxis, YAxis } from 'react-financial-charts'
import { makeCanvasProps } from '../../../services/canvasProps'
import createWebSocket, { finchartOnMessage } from '../../../services/createWebSocket'
import fetchData from '../../../services/fetchData'
import { axisStyles, candleSeriesProps, lineSeriesProps, mainChartProps } from '../../../services/mainChartProps'
import { edgeIndicatorProps, mouseCoordinateYProps } from '../../../services/miscProps'
import { volumeChartProps, volumeSeriesProps } from '../../../services/volumeProps'

const ChartBody = ({symbol, interval, type}) => {
	
	const [data, setData] = useState([])
	
	useEffect(() => {
		fetchData(symbol, interval, x => setData(x))
		return createWebSocket(`live_trades_${symbol}`, finchartOnMessage(interval, setData))
	}, [interval, symbol])
	
	return (
		<ChartCanvas {...makeCanvasProps(data)}>
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