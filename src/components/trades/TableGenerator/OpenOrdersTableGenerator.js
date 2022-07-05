import { Table } from "@mantine/core";
import React from "react";
import { useMutation } from "@apollo/client";
import { CANCEL_ORDER_MUTATION } from "../../../queries/order.js";

export default function OpenOrdersTableGenerator({ DataObject, title, symbol, side }) {
    const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION, {
        onCompleted: ({ cancelOrder }) => {
            if (cancelOrder.response) {
                console.log(cancelOrder.response)
                window.location.reload()
            }
        }
    })
    return (
        <Table verticalSpacing='xs' highlightOnHover>
            <thead>
                <tr>
                    <th colSpan="2">{title}</th>
                </tr>
                <tr key={"header"}>
                    {Object.keys(DataObject[0]).map((key) => (
                        <th>{key}</th>
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
                            <button>Modify</button>
                            <button onClick={() => cancelOrder({ variables: { symbol: symbol, side: side, price: item.price, orderId: item.orderid } })}>Cancel</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table >
        // <div>HI</div>
    );
}