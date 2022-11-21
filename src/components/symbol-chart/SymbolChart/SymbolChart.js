import { Group, Select, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { INTERVALS } from '../../../constants/intervals'
import { CHART_TYPES } from '../../../constants/chartTypes'
import ChartBody from '../ChartBody/ChartBody'
import TradingViewWidget, { IntervalTypes } from 'react-tradingview-widget';

const INTERVAL_KEYS = Object.keys(INTERVALS)

const SymbolChart = ({ symbol }) => {
	const [type, setType] = useState(CHART_TYPES[0])
	const [timeInterval, setTimeInterval] = useState(INTERVAL_KEYS[0])
	return (
		<Stack>
			<Title order={3}>Chart</Title>
			{/* <Group>
				<Select value={type} onChange={e => setType(e)} data={CHART_TYPES} />
				<Select value={timeInterval} onChange={e => setTimeInterval(e)} data={INTERVAL_KEYS} />
			</Group>
			<ChartBody type={type} interval={INTERVALS[timeInterval]} symbol={symbol.code} newOrder={newOrder} /> */}
			<TradingViewWidget
				width={800}
				height={520}
				symbol={"COINBASE:" + symbol.code.toUpperCase()}
				interval={IntervalTypes.D}
				timezone="Etc/UTC"
				style="1"
				locale="in"
			/>
		</Stack>

	)
}

export default SymbolChart