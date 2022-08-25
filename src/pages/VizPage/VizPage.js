import React from "react";
import { Stack, Title, Card} from "@mantine/core";
import FearGreedImage from "./DataAPI/FearGreedImage";
import FearGreedData from "./DataAPI/FearGreedData";
import WidgetDisplay from "./DataAPI/WidgetsDisplay";
// import BitcoinHashRateData from "./DataAPI/BitcoinHashRateData";
import GlobalCapData from "./DataAPI/TotalCap";
import Top10CoinData from "./DataAPI/TopCoins";
import TrendingCoinData from "./DataAPI/TrendingNow";

export default function VizPage() {

	return (
		<div>
		<Stack p={24}>
			<Title order={2}>Viz Page</Title>
			<Card>Fear Greed Image</Card>
			<Card><FearGreedImage/></Card>
			<Card>Fear Greed History</Card>
			<Card><FearGreedData/></Card>
			{/* <Card>BTC Hash Rate</Card>
			<Card><BitcoinHashRateData /></Card> */}
			<Card>TotalCap Bar Chart and Value Card</Card>
			<Card><GlobalCapData /></Card>
			<Card>Top 10 Coins</Card>
			<Card><Top10CoinData/></Card>
			{/* <Card>Correlation</Card>
			<Card>--get history and run pearson correlation to heatmap--</Card> */}
			<Card>Trending Projects</Card>
			<Card><TrendingCoinData /></Card>
			{/* <Card>Live Widget/DATA</Card>
			<Card>--websocket figure out--</Card> */}
			{/* <Card><WidgetDisplay/></Card> */}
		</Stack>
		</div>
	)
	
}