import { Table, Popover, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";
import { useMutation } from "@apollo/client";
import { CANCEL_ORDER_MUTATION, MODIFY_ORDER_MUTATION } from "../../../queries/order.js";
import { useState } from 'react';
import { CurrencyDollar, Hash } from "tabler-icons-react";

export default function OpenOrdersTableGenerator({ DataObject, title, symbol, side }) {
    const visibility = {};
    for (let i = 0; i < DataObject.length; i++) {
        visibility[DataObject[i].orderid] = false;
    }

    const [visible, setVisible] = useState(visibility);

    const form = useForm({
        initialValues: {
            price: 12,
            qty: 5
        }
    })

    const [cancelOrderMutation] = useMutation(CANCEL_ORDER_MUTATION, {
        onCompleted: ({ cancelOrder }) => {
            if (cancelOrder.response) {
                console.log(cancelOrder.response)
                window.location.reload()
            }
        }
    })

    const [modifyOrderMutation] = useMutation(MODIFY_ORDER_MUTATION, {
        onCompleted: ({ modifyOrder }) => {
            if (modifyOrder.response) {
                console.log(modifyOrder.response)
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
                            <Popover
                                opened={visible[item.orderid]}
                                onClose={() => setVisible((visible) => ({ ...visible, [item.orderid]: false }))}
                                position="right"
                                placement="end"
                                withCloseButton
                                transition="pop-top-right"
                                target={
                                    <button
                                        onClick={() => setVisible((visible) => ({ ...visible, [item.orderid]: !visible[item.orderid] }))}
                                    >
                                        Modify
                                    </button>
                                }
                                children={
                                    <Stack spacing="sm">
                                        {item.price !== "Market" && <NumberInput label="New Price" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={1000000} icon={<CurrencyDollar size={18} />} {...form.getInputProps('price')} />}
                                        < NumberInput label="New Quantity" defaultValue={0.05} precision={2} min={0.01} step={0.05} max={100} icon={<Hash size={18} />} {...form.getInputProps('qty')} />
                                        <button onClick={() => modifyOrderMutation({ variables: { symbol: symbol, side: side, orderId: item.orderid, prevQuantity: item.quantity, prevPrice: item.price, newQuantity: form.values.qty, newPrice: form.values.price } })}>Submit</button>
                                    </Stack>
                                }
                            >
                            </Popover>
                            <button onClick={() => cancelOrderMutation({ variables: { symbol: symbol, side: side, price: item.price, orderId: item.orderid } })}>Cancel</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table >
        // <div>HI</div>
    );
}

// export function EditUserPopover() {
//     const [values, setValues] = useState({ name: 'Bob Handsome', email: 'bob@handsome.inc' });
//     const [opened, setOpened] = useState(false);
//     const theme = useMantineTheme();

//     return (
//         <Group>
//             <User name={values.name} email={values.email} />

//             <Popover
//                 opened={opened}
//                 onClose={() => setOpened(false)}
//                 position="bottom"
//                 placement="end"
//                 withCloseButton
//                 title="Edit user"
//                 transition="pop-top-right"
//                 target={
//                     <ActionIcon
//                         variant={theme.colorScheme === 'dark' ? 'hover' : 'light'}
//                         onClick={() => setOpened((o) => !o)}
//                     >
//                         <Edit size={16} />
//                     </ActionIcon>
//                 }
//             >
//                 <UserEditForm
//                     initialValues={values}
//                     onCancel={() => setOpened(false)}
//                     onSubmit={(data) => {
//                         setValues(data);
//                         setOpened(false);
//                     }}
//                 />
//             </Popover>
//         </Group>
//     );
// }