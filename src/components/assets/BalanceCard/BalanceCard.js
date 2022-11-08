import { Button, Card, Divider, Grid, NumberInput, Space, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyDollar } from "tabler-icons-react";
import { GET_USER_BALANCE, ADD_BALANCE_MUTATION } from '../../../queries/OrdersAndWallets'
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client'
import { showNotification } from "@mantine/notifications"


export default function BalanceCard({ userid }) {

	const [userBalance, setUserBalance] = useState(0)
	const [userLocked, setUserLocked] = useState(0)
	const { loading: queryloading, error: queryError, data: queryData } = useQuery(GET_USER_BALANCE,
		{ variables: { userid } }
	);

	const form = useForm({
		initialValues: { amount: 0.00 }
	})

	const [startAddBalance] = useMutation(ADD_BALANCE_MUTATION, {
		variables: {
			userid: userid,
			amount: form.values.amount
		},
		onCompleted: ({ addBalance }) => {
			// console.log(addBalance.error)
			if (addBalance.response) {
				console.log("ADDED BALANCE ", addBalance)
				window.location.reload()
			} else {
				showNotification({
					title: 'Balance Add Failed',
					message: addBalance.error
				})
			}
		}
	})

	useEffect(() => {
		try {
			if (queryData !== undefined && queryData.getUserBalance) {
				const res = queryData.getUserBalance
				setUserBalance(res[0])
				setUserLocked(res[1])
			}
		} catch (error) { }
	}, [userid, queryloading, queryError, queryData])

	// console.log(userBalance)
	// console.log(userid)
	// console.log("HERE XXXXXXXXXXXXXXXXXXXX")

	return (
		<Card withBorder>
			<Stack spacing={6}>
				<Grid>
					<Grid.Col>
						<Title order={5}>Balance</Title>
						<Text size='xl'>${userBalance}</Text>
					</Grid.Col>
					<Grid.Col>
						{/* <Text>{userid}</Text> */}
						<Title order={5}>Locked</Title>
						<Text size='xl'>${userLocked}</Text>
					</Grid.Col>
				</Grid>

				<Space />
				<Text size="xs">As of 4 June 2022</Text>
			</Stack>
			<Divider my='md' size='xs' mx='sm' />
			<Stack spacing={6}>
				<Title order={5}>Top Up</Title>
				<NumberInput label="Amount" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100000} icon={<CurrencyDollar size={18} />} {...form.getInputProps('amount')} />
				<Space />
				{/* <Button variant='filled' size="sm" onClick={() => window.location.reload()} disabled={form.values.amount === 0}>Top Up</Button> */}
				<Button variant='filled' size="sm" onClick={() => startAddBalance()} disabled={form.values.amount === 0}>Top Up</Button>
			</Stack>
		</Card>
	)
}