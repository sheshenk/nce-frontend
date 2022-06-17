import { Group, Stack, Title } from "@mantine/core"
import { useParams } from "react-router-dom"
import OrderBook from "../../components/symbol-chart/OrderBook/OrderBook"
import SymbolChart from "../../components/symbol-chart/SymbolChart/SymbolChart"
import SpotComponent from "../../components/trades/SpotComponent/SpotComponent"
import { SYMBOLS } from "../../constants/symbols"

export default function SymbolPage(props) {
	const { code } = useParams()
	const symbol = SYMBOLS.find(x => x.code === code)

	return (
		<Stack p={24} spacing={36}>
			<Group>
				{symbol.icon}
				<Title order={2}>Trade {symbol.name} ({symbol.symbol})</Title>
			</Group>
			<Group spacing={48} align='baseline'>
				<SymbolChart symbol={symbol} />
				<OrderBook symbol={symbol.code} />
				<SpotComponent symbol={symbol.code} ownerID={props.user.userid} walletID={props.user.userid} />
			</Group>

		</Stack>
	)
}