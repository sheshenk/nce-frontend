import { Group, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { useParams } from "react-router-dom"
import OrderBook from "../../components/symbol-chart/OrderBook/OrderBook"
import SymbolChart from "../../components/symbol-chart/SymbolChart/SymbolChart"
import SpotComponent from "../../components/trades/SpotComponent/SpotComponent"
import UserOrdersComponent from "../../components/trades/UserOrdersComponent/UserOrdersComponent"
import { SYMBOLS } from "../../constants/symbols"

export default function SymbolPage(props) {
	const { code } = useParams()
	const symbol = SYMBOLS.find(x => x.code === code)
	const [closedOrders, setClosedOrders] = useState([])
	const [openAskOrders, setOpenAskOrders] = useState([])
	const [openBidOrders, setOpenBidOrders] = useState([])
	return (
		<Stack p={24} spacing={36}>
			<Group>
				{symbol.icon}
				<Title order={2}>Trade {symbol.name} ({symbol.symbol})</Title>
			</Group>
			< Group spacing={48} align='baseline'>
				<SymbolChart symbol={symbol} />
				<OrderBook symbol={symbol.code} />
				<SpotComponent symbol={symbol.code} ownerId={parseInt(props.user.userid)} walletId={parseInt(props.user.userid)}
					setClosedOrders={setClosedOrders} setOpenAskOrders={setOpenAskOrders} setOpenBidOrders={setOpenBidOrders} />
				<UserOrdersComponent symbol={symbol.code} owner={props.user.userid} closedOrders={closedOrders} setClosedOrders={setClosedOrders}
					openAskOrders={openAskOrders} setOpenAskOrders={setOpenAskOrders} openBidOrders={openBidOrders} setOpenBidOrders={setOpenBidOrders} />
			</Group>
		</Stack >
	)
}
