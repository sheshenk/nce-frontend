import { Card, Stack, Table, Title } from "@mantine/core";

const assets = [
	{
		symbol: 'BTC',
		price: 30192,
		amount: 0.08
	},
	{
		symbol: 'ETH',
		price: 1712,
		amount: 1.6
	},
	{
		symbol: 'XRP',
		price: 13,
		amount: 25.2
	},
]

export default function AssetsTable() {
	return (
		<Card withBorder>
			<Stack>
				<Title order={5}>Your Assets</Title>
				<Table>
					<thead>
						<tr>
							<th>Symbol</th>
							<th>Price</th>
							<th>Amount</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{
							assets.map(a => (
								<tr key={a}>
									<td>{a.symbol}</td>
									<td>${a.price}</td>
									<td>{a.amount}</td>
									<td>${(a.price * a.amount).toFixed(2)}</td>
								</tr>
							))
						}
					</tbody>
				</Table>
			</Stack>
		</Card>
		
	)
}