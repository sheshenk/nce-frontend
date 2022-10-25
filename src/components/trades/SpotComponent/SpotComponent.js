import { useMutation } from "@apollo/client"
import { Button, LoadingOverlay, NumberInput, Select, SimpleGrid, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { CurrencyDollar, Hash } from "tabler-icons-react";
import { ADD_ORDER_MUTATION } from "../../../queries/order";

const modes = [
	{
		mode: 'Buy',
		component: <div>Buy</div>
	},
	{
		mode: 'Sell',
		component: <div>Sell</div>
	},
	{
		mode: 'Convert',
		component: <div>Convert</div>
	},
]

export default function SpotComponent(props) {
	// const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	// const [err, setErr] = useState('');
	const [mode, setMode] = useState(modes[0].mode)

	const form = useForm({
		initialValues: {
			orderType: 'Limit',
			price: 12,
			qty: 5
		}
	})

	const [placeOrder] = useMutation(ADD_ORDER_MUTATION, {
		variables: {
			symbol: props.symbol,
			type: form.values.orderType,
			side: mode,
			quantity: form.values.qty,
			price: form.values.price,
			ownerId: props.ownerId,
			walletId: props.walletId
		},
		onCompleted: ({ createOrder }) => {
			if (createOrder.response) {
				console.log(createOrder.response)
				// window.location.reload()
			}
		}
	})
	// Message format:
	// -   Add, Symbol, Type, Side, Quantity, Price, Owner ID, Wallet ID, Stop Price (Optional)
	//     add ETHUSD limit ask 100 64000 user1 Alice1 (60000)
	//     add ethusd market ask 100 0 user1 Alice1 (60000)

	// -   Modify, Symbol, Side, Order ID, prev Quantity, prev Price, new Quantity, new Price
	//     modify ETHUSD buy 0000000002 100 63000 100 64000 //change price to 64000 only

	//   - Cancel, Symbol, Side, Price, Order ID
	//     cancel ETHUSD buy 100 0000000001
	// type RequestBody struct {
	// 	Operation    string `json:"operation"`
	// 	Symbol       string `json:"symbol"`
	// 	Type         string `json:"type"`
	// 	Side         string `json:"side"`
	// 	Quantity     string `json:"quantity"`
	// 	Price        string `json:"price"`
	// 	OwnerID      string `json:"owner_id"`
	// 	WalletID     string `json:"wallet_id"`
	// 	OrderID      string `json:"order_id"`
	// 	PrevQuantity string `json:"prev_quantity"`
	// 	PrevPrice    string `json:"prev_Price"`
	// 	NewQuantity  string `json:"new_quantity"`
	// 	NewPrice     string `json:"new_price"`
	// }
	const placeOrderHandler = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:8000/order', {
				method: 'POST',
				body: JSON.stringify({
					operation: "ADD",
					symbol: props.symbol,
					type: form.values.orderType,
					side: mode,
					quantity: form.values.qty,
					price: form.values.price,
					owner_Id: toString(props.ownerId),
					wallet_Id: toString(props.walletId)
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
			setIsLoading(false);
		}
	};

	return (
		<Stack>
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			<Title order={3}>Spot</Title>
			<SimpleGrid cols={3}>
				{modes.map((m, index) => <Button key={index} size="xs" onClick={() => setMode(m.mode)} variant={m.mode === mode ? 'filled' : 'light'}>{m.mode}</Button>)}
			</SimpleGrid>
			<Select value="" {...form.getInputProps('orderType')} data={['Limit', 'Market']} />
			{form.values.orderType === 'Limit' && <NumberInput label="Order Price" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={1000000} icon={<CurrencyDollar size={18} />} {...form.getInputProps('price')} />}
			<NumberInput label="Quantity" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100} icon={<Hash size={18} />} {...form.getInputProps('qty')} />
			<Button size="md" onClick={() => { placeOrderHandler(); placeOrder().catch((error) => { console.log(JSON.stringify(error, null, 2)); }) }}>{mode} Now</Button>
		</Stack >
	)
}