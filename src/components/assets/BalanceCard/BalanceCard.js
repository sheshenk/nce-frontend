import { Button, Card, Divider, Grid, LoadingOverlay, NumberInput, Space, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyDollar } from "tabler-icons-react";
import { GET_USER_BALANCE } from '../../../queries/OrdersAndWallets'
import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client'


export default function BalanceCard({ userid }) {

	const [userBalance, setUserBalance] = useState(0)
	const [userLocked, setUserLocked] = useState(0)
	const [cumuPL, setCumuPL] = useState(0)
	const [ytm, setYtm] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [date, setDate] = useState("")
	const [color, setColor] = useState("green")
	const { loading: queryloading, error: queryError, data: queryData, refetch: refetch } = useQuery(GET_USER_BALANCE,
		{ variables: { userid } }
	);
	useEffect(() => {
		refetch()
	}, [])

	useEffect(() => {
		let d = new Date()
		let month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'][d.getMonth()]
		setDate(d.getDate() + ' ' + month + ' ' + d.getFullYear());
	}, [])

	const form = useForm({
		initialValues: { amount: 0.00 }
	})

	// const [startAddBalance] = useMutation(ADD_BALANCE_MUTATION, {
	// 	variables: {
	// 		userid: userid,
	// 		amount: form.values.amount
	// 	},
	// 	onCompleted: ({ addBalance }) => {
	// 		// console.log(addBalance.error)
	// 		if (addBalance.response) {
	// 			console.log("ADDED BALANCE ", addBalance)
	// 			window.location.reload()
	// 		} else {
	// 			showNotification({
	// 				title: 'Balance Add Failed',
	// 				message: addBalance.error
	// 			})
	// 		}
	// 	}
	// })
	const topupHandler = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('http://localhost:8000/user/balance', {
				method: 'POST',
				body: JSON.stringify({
					userid: userid,
					amount: form.values.amount
				}),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('result is: ', JSON.stringify(result, null, 4));
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsLoading(false)
			window.location.reload()
		}
	};

	const cumulativeHandler = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('http://localhost:8000/user/cumulativepl?' + new URLSearchParams({ userid: userid }));
			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}
			const result = await response.json();
			console.log('result is: ', JSON.stringify(result, null, 4));
			setCumuPL(result.cumu)
			setYtm(parseFloat(result.cumu) > 0 ? result.ytm : -result.ytm)
			setColor(parseFloat(result.cumu) > 0 ? "green" : "red")
		} catch (err) {
			return err
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		try {
			if (queryData !== undefined && queryData.getUserBalance) {
				const res = queryData.getUserBalance
				setUserBalance(res[0])
				setUserLocked(res[1])
			}
		} catch (error) { }
	}, [userid, queryloading, queryError, queryData])

	useEffect(() => {
		cumulativeHandler()
	}, [])

	return (
		<Card withBorder>
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			<Stack spacing={6}>
				<Grid spacing={8}>
					<Grid.Col span={8}>
						<Title order={5}>Balance</Title>
						<Text size='xl'>${userBalance}</Text>
					</Grid.Col>
					<Grid.Col span={4}>
						<Title order={5} ta="right">Cumulative P/L($)</Title>
						<Text size='xl' color={color} ta="right">{cumuPL}</Text>
					</Grid.Col>
					<Grid.Col span={8}>
						{/* <Text>{userid}</Text> */}
						<Title order={5}>Locked</Title>
						<Text size='xl'>${userLocked}</Text>
					</Grid.Col>
					<Grid.Col span={4}>
						<Title order={5} ta="right">Yield to Maturity(%)</Title>
						<Text size='xl' color={color} ta="right">{ytm}</Text>
					</Grid.Col>
				</Grid>

				<Space />
				<Text size="xs">As of {date}</Text>
			</Stack>
			<Divider my='md' size='xs' mx='sm' />
			<Stack spacing={6}>
				<Title order={5}>Top Up</Title>
				<NumberInput label="Amount" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100000} icon={<CurrencyDollar size={18} />} {...form.getInputProps('amount')} />
				<Space />
				<Button variant='filled' size="sm" onClick={() => topupHandler()} disabled={form.values.amount === 0}>Top Up</Button>
			</Stack>
		</Card>
	)
}