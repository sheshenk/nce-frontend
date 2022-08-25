import { Stack, Title, Card, Image, Text, Badge, Button, Group, SimpleGrid, Box, Space, Anchor } from "@mantine/core";

export default function BlogPage() {
	const rightIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="7 7 12 12 7 17" />
			<polyline points="13 7 18 12 13 17" />
		</svg>
	)
	return (
		<Stack p={24}>
			<Title order={2}>About Certification</Title>
			<Group spacing={48} align='baseline' sx={{ position: 'relative' }}>
				<Box sx={{ width: '20%' }} >
					<Button variant="default" size="xl" rightIcon={rightIcon} styles={(theme) => ({
						root: {
							width: 400,
							alignContent: 'left',
							'&:hover': {
								backgroundColor: theme.fn.darken('#ffffff', 0.1),
								right: -10,
							},
						},
						rightIcon: {
							marginRight: 15,
						},
					})}>Newly Launched</Button>
					<Space mt={1} />
					<Button variant="default" size="xl" styles={(theme) => ({
						root: {
							width: 400,
							'&:hover': {
								backgroundColor: theme.fn.darken('#ffffff', 0.1),
								right: -10,
							},
						},
						rightIcon: {
							marginRight: 15,

						},
					})}>Learn Trading</Button>
					<Space mt={1} />
					<Button variant="default" size="xl" styles={(theme) => ({
						root: {
							width: 400,
							'&:hover': {
								backgroundColor: theme.fn.darken('#ffffff', 0.1),
								right: -10,
							},
						},
						rightIcon: {
							marginRight: 15,

						},
					})}>Learn Blockchain</Button>
					<Space mt={1} />
					<Button variant="default" size="xl" styles={(theme) => ({
						root: {
							width: 400,
							'&:hover': {
								backgroundColor: theme.fn.darken('#ffffff', 0.1),
								right: -10,
							},
						},
						rightIcon: {
							marginRight: 15,

						},
					})}>Learn Algo Trading</Button>
				</Box>
				<SimpleGrid cols={3} sx={{ width: '70%', float: 'left', right: 0, top: 0, position: "absolute", }}>
					<Card shadow="sm" p="lg" radius="md" withBorder>
						<Card.Section>
							<Image
								src="https://cryptoslate.com/wp-content/themes/cryptoslate-2020/imgresize/timthumb.php?src=https://cryptoslate.com/wp-content/uploads/2022/04/ethereum-interview-.jpg&w=600&h=315&q=75"
								height={160}
								alt="crypto"
							/>
						</Card.Section>

						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>Certified Cryptocurrency Professional <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
								<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
							</svg></Text>
							<Badge color="blue" variant="light">
								8 Hour
							</Badge>
							<Badge color="green" variant="light">
								Lifetime Access
							</Badge>
						</Group>

						<Text size="sm" color="dimmed">
							Learn about cryptocurrencies from the basic concepts, how it revolutionized digital marketing and how to trade it.
						</Text>
						<Anchor href="http://localhost:3000/trade/btcusd">
							<Button variant="light" color="blue" fullWidth mt="md" radius="md" disabled>
								Completed!
							</Button>
						</Anchor>
					</Card>
					<Card shadow="sm" p="lg" radius="md" withBorder>
						<Card.Section>
							<Image
								src="https://public.bnbstatic.com/image/cms/crawler/coingape/WisdomTree-Ethereum-ETH-ETP.jpeg"
								height={160}
								alt="trader"
							/>
						</Card.Section>

						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>Certified Cryptocurrency Trader <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
							</svg></Text>
							<Badge color="blue" variant="light">
								12 Hour
							</Badge>
							<Badge color="green" variant="light">
								Lifetime Access
							</Badge>
						</Group>

						<Text size="sm" color="dimmed">
							Trading cryptocurrency is a must-have skill for any serious investor. Learn the types of orders and try out in the simulated exchange.
						</Text>
						<Anchor href="/trade/btcusd">
							<Button variant="light" color="blue" fullWidth mt="md" radius="md" >
								Enroll Now!
							</Button>
						</Anchor>
					</Card>
					<Card shadow="sm" p="lg" radius="md" withBorder>
						<Card.Section>
							<Image
								src="https://cdn.coingape.com/wp-content/uploads/2020/06/20133134/Best-Bitcoin-and-Crypto-Trading-Bots-2020-678x381.jpg"
								height={160}
								alt="Norway"
							/>
						</Card.Section>

						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>Certified Trading Bot Developer <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
							</svg></Text>
							<Badge color="blue" variant="light">
								20 Hour
							</Badge>
							<Badge color="red" variant="light">
								Limited Time Access
							</Badge>
						</Group>

						<Text size="sm" color="dimmed">
							Crypto market runs 24/7, you need a restless buddy to protect your money. Apply the market knowledge and develop your own bot.
						</Text>
						<Anchor href="/trade/btcusd">
							<Button variant="light" color="blue" fullWidth mt="md" radius="md">
								Enroll Now!
							</Button>
						</Anchor>
					</Card>
					<Card shadow="sm" p="lg" radius="md" withBorder>
						<Card.Section>
							<Image
								src="https://static.news.bitcoin.com/wp-content/uploads/2017/03/shutterstock_117385867.jpg"
								height={160}
								alt="Norway"
							/>
						</Card.Section>

						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>Certified Algo Trading Master <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
							</svg></Text>
							<Badge color="blue" variant="light">
								40 Hour
							</Badge>
							<Badge color="red" variant="light">
								Limited Time Access
							</Badge>
						</Group>

						<Text size="sm" color="dimmed">
							Compete your bot against other well-developed algorithms in a simulated market, fight for the best and win the competition.
						</Text>
						<Anchor href="/trade/btcusd">
							<Button variant="light" color="blue" fullWidth mt="md" radius="md">
								Enroll Now!
							</Button>
						</Anchor>
					</Card>
				</SimpleGrid>
			</Group>
		</Stack >
	)
}