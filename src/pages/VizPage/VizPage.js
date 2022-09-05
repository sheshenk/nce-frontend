import React from "react";
import { Stack, Title, Card, Grid} from "@mantine/core";
import FearGreedImage from "./DataAPI/FearGreedImage";
import FearGreedData from "./DataAPI/FearGreedData";
import GlobalCapData from "./DataAPI/TotalCap";
import Top10CoinData from "./DataAPI/TopCoins";
import TrendingCoinData from "./DataAPI/TrendingNow";
import DeFi from "./DataAPI/DeFi";

export default function VizPage() {

	console.log(window.innerWidth)

	if(window.innerWidth > 1000){
		return (
			<div>
			<Stack p={24}>
				<Title order={2}>Global Cryptocurrency Status</Title>
				<Card>
					<Grid columns={5}>
						<Grid.Col span={2}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Fear Greed Index</Title>
									<Card><FearGreedImage/></Card>
								</Stack>
							</Card>
						</Grid.Col>
						<Grid.Col span={3}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Fear Greed History</Title>
									<Card><FearGreedData/></Card>
								</Stack>
							</Card>
						</Grid.Col>
					</Grid>
				</Card>
				
				<Card>
					<Grid columns={10}>
						<Grid.Col span={4}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Global Cryptocurrency Market Cap</Title>
									<div><GlobalCapData /></div>
								</Stack>
							</Card>
						</Grid.Col>
						<Grid.Col span={6}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Top 10 Cryptocurrencies</Title>
									<div><Top10CoinData/></div>
								</Stack>
							</Card>
						</Grid.Col>
					</Grid>
				</Card>
	
				<Card>
					<Grid columns={10}>
						<Grid.Col span={4}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Trending Coins (powered by CoinGecko)</Title>
									<div><TrendingCoinData /></div>
								</Stack>
							</Card>
						</Grid.Col>
						<Grid.Col span={6}>
							<Card withBorder>
								<Stack>
									<Title order={4}>Decentralized Finance</Title>
									<div><DeFi /></div>
								</Stack>
							</Card>
						</Grid.Col>
					</Grid>
				</Card>
				<Card></Card>
			</Stack>
			</div>
		)
	}

	else {
		return (
			<div>
			<Stack p={24}>
				<Title order={2}>Global Cryptocurrency Status</Title>
				<Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Fear Greed Index</Title>
									<Card><FearGreedImage/></Card>
								</Stack>
							</Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Fear Greed History</Title>
									<Card><FearGreedData/></Card>
								</Stack>
							</Card>
				</Card>
				
				<Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Global Cryptocurrency Market Cap</Title>
									<div><GlobalCapData /></div>
								</Stack>
							</Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Top 10 Cryptocurrencies</Title>
									<div><Top10CoinData/></div>
								</Stack>
							</Card>
				</Card>
	
				<Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Trending Coins (powered by CoinGecko)</Title>
									<div><TrendingCoinData /></div>
								</Stack>
							</Card>
							<Card withBorder>
								<Stack>
									<Title order={4}>Decentralized Finance</Title>
									<div><DeFi /></div>
								</Stack>
							</Card>
				</Card>
				<Card></Card>
			</Stack>
			</div>
		)
	}

	// return (
	// 	<div>
	// 	<Stack p={24}>
	// 		<Title order={2}>Global Cryptocurrency Status</Title>
	// 		<Card>
	// 			<Grid columns={5}>
	// 				<Grid.Col span={2}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Fear Greed Index</Title>
	// 							<Card><FearGreedImage/></Card>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 				<Grid.Col span={3}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Fear Greed History</Title>
	// 							<Card><FearGreedData/></Card>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 			</Grid>
	// 		</Card>
			
	// 		<Card>
	// 			<Grid columns={10}>
	// 				<Grid.Col span={4}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Global Cryptocurrency Market Cap</Title>
	// 							<div><GlobalCapData /></div>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 				<Grid.Col span={6}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Top 10 Cryptocurrencies</Title>
	// 							<div><Top10CoinData/></div>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 			</Grid>
	// 		</Card>

	// 		<Card>
	// 			<Grid columns={10}>
	// 				<Grid.Col span={4}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Trending Coins (powered by CoinGecko)</Title>
	// 							<div><TrendingCoinData /></div>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 				<Grid.Col span={6}>
	// 					<Card withBorder>
	// 						<Stack>
	// 							<Title order={4}>Decentralized Finance</Title>
	// 							<div><DeFi /></div>
	// 						</Stack>
	// 					</Card>
	// 				</Grid.Col>
	// 			</Grid>
	// 		</Card>
	// 		<Card></Card>
	// 	</Stack>
	// 	</div>
	// )
	
}