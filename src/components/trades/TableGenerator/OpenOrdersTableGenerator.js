import { Table, Popover, NumberInput, Stack, Notification, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
// import { useMutation } from "@apollo/client";
// import { CANCEL_ORDER_MUTATION, MODIFY_ORDER_MUTATION } from "../../../queries/order.js";
import { useState } from 'react';
import { CurrencyDollar, Hash } from "tabler-icons-react";
import { IconCheck, IconX } from '@tabler/icons';
import { getOrderHandler } from "../../../services/orderHandlers";
import { timeFormat } from "react-financial-charts";

export default function OpenOrdersTableGenerator({ owner, DataObject, setAsks, setBids, setClosed, title, symbol, side }) {
    const visibility = {};
    for (let i = 0; i < DataObject.length; i++) {
        visibility[DataObject[i].orderid] = false;
    }

    const [visible, setVisible] = useState(visibility);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null)


    const form = useForm({
        initialValues: {
            price: 12,
            qty: 5
        }
    })

    // const [cancelOrderMutation] = useMutation(CANCEL_ORDER_MUTATION, {
    //     onCompleted: ({ cancelOrder }) => {
    //         if (cancelOrder.response) {
    //             console.log(cancelOrder.response)
    //             window.location.reload()
    //         }
    //     }
    // })

    // const [modifyOrderMutation] = useMutation(MODIFY_ORDER_MUTATION, {
    //     onCompleted: ({ modifyOrder }) => {
    //         if (modifyOrder.response) {
    //             console.log(modifyOrder.response)
    //             window.location.reload()
    //         }
    //     }
    // })


    const modifyOrderHandler = async (symbol, side, orderId, prevQuantity, prevPrice, newQuantity, newPrice) => {
        setIsLoading(true);
        setNotification(
            <Notification
                loading
                title="Sending modify order request to server"
                disallowClose
            >
                Please wait until order is modified
            </Notification>
        )
        try {
            const response = await fetch('http://localhost:8000/order', {
                method: 'PUT',
                body: JSON.stringify({
                    symbol: symbol,
                    side: side,
                    order_id: orderId,
                    prev_quantity: prevQuantity,
                    prev_price: prevPrice,
                    new_quantity: newQuantity,
                    new_price: newPrice
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
            setNotification(
                <Notification icon={<IconCheck size={18} />} color="teal" title="Modify order successful" onClose={() => { setNotification(null) }}>
                    Order is modified and added to order book
                </Notification>
            )
            console.log('result is: ', JSON.stringify(result, null, 4));
        } catch (err) {
            console.log(err.message);
            setNotification(
                <Notification icon={<IconX size={18} />} color="red" onClose={() => { setNotification(null) }}>
                    Error! {err.message}
                </Notification>
            )
        } finally {
            setIsLoading(false);
            getOrderHandler(owner, symbol, setAsks, setBids, setClosed)
        }
    };

    const cancelOrderHandler = async (symbol, side, price, orderId) => {
        setIsLoading(true);
        setNotification(
            <Notification
                loading
                title="Sending cancel order request to server"
                disallowClose
            >
                Please wait until order is canceled
            </Notification>
        )
        try {
            const response = await fetch('http://localhost:8000/order', {
                method: 'DELETE',
                body: JSON.stringify({
                    symbol: symbol,
                    side: side,
                    order_id: orderId,
                    price: price
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
            setNotification(
                <Notification icon={<IconCheck size={18} />} color="teal" title="Cancel order successful" onClose={() => { setNotification(null) }}>
                    Order is canceled and removed from the order book
                </Notification>
            )
            console.log('result is: ', JSON.stringify(result, null, 4));
        } catch (err) {
            console.log(err.message);
            setNotification(
                <Notification icon={<IconX size={18} />} color="red" onClose={() => { setNotification(null) }}>
                    Error! {err.message}
                </Notification>
            )
        } finally {
            setIsLoading(false);
            getOrderHandler(owner, symbol, setAsks, setBids, setClosed)
        }
    };

    return (
        <>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            {notification}
            <Table verticalSpacing='xs' highlightOnHover>
                <thead>
                    <tr>
                        <th colSpan="2">{title}</th>
                    </tr>
                    <tr key={"header"}>
                        {Object.keys(DataObject[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {DataObject.map((item) => (
                        <tr key={item.id}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                            <td>
                                <Popover
                                    opened={visible[item.orderid]}
                                    onClose={() => setVisible((visible) => ({ ...visible, [item.orderid]: false }))}
                                    position="right"
                                    placement="end"
                                    withCloseButton
                                    transition="pop-top-right"
                                >
                                    <Popover.Target>
                                        <button
                                            onClick={() => setVisible((visible) => ({ ...visible, [item.orderid]: !visible[item.orderid] }))}
                                        >
                                            Modify
                                        </button>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <Stack spacing="sm">
                                            {item.price !== "Market" && <NumberInput label="New Price" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={1000000} icon={<CurrencyDollar size={18} />} {...form.getInputProps('price')} />}
                                            < NumberInput label="New Quantity" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100} icon={<Hash size={18} />} {...form.getInputProps('qty')} />
                                            <button onClick={() => { modifyOrderHandler(symbol, side, item.orderid, item.quantity, item.price, form.values.qty, form.values.price) }}>Submit</button>
                                            {/* modifyOrderMutation({variables: {symbol: symbol, side: side, orderId: item.orderid, prevQuantity: item.quantity, prevPrice: item.price, newQuantity: form.values.qty, newPrice: form.values.price } }) */}
                                        </Stack>
                                    </Popover.Dropdown>
                                </Popover>

                                <button onClick={() => { cancelOrderHandler(symbol, side, item.price, item.orderid) }}>Cancel</button>
                                {/* {() => cancelOrderMutation({ variables: { symbol: symbol, side: side, price: item.price, orderId: item.orderid } })} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>
    );
}