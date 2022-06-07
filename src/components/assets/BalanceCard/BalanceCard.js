import { Button, Card, Divider, NumberInput, Space, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { CurrencyDollar } from "tabler-icons-react";

export default function BalanceCard() {

	const form = useForm({
		initialValues: { amount: 0.00 }
	})

	return (
		<Card withBorder>
			<Stack spacing={6}>
				<Title order={5}>Balance</Title>
				<Text size='xl'>$100.00</Text>
				<Space/>
				<Text size="xs">As of 4 June 2022</Text>
			</Stack>
			<Divider my='md' size='xs' mx='sm'/>
			<Stack spacing={6}>
				<Title order={5}>Top Up</Title>
				<NumberInput label="Quantity" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100} icon={<CurrencyDollar size={18}/>} {...form.getInputProps('amount')}/>
				<Space/>
				<Button size="sm" disabled={form.values.amount === 0}>Top Up</Button>
			</Stack>
		</Card>
	)
}