import { Stack, Title } from "@mantine/core"
import { INTERVALS } from '../../../constants/intervals'
import TradingViewWidget, { IntervalTypes } from 'react-tradingview-widget';

const INTERVAL_KEYS = Object.keys(INTERVALS)

const SymbolChart = ({ symbol }) => {
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