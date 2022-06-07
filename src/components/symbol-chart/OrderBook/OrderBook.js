import { Stack, Title } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { colors } from "../../../constants/colors";
import createWebSocket, { orderBookOnMessage } from "../../../services/createWebSocket";
import ExchangeTable from "../ExchangeTable/ExchangeTable";

const OrderBook = ({symbol}) => {
  const [orders, setOrders] = useState([]);
  const currencyArray = symbol.toUpperCase().match(/.{1,3}/g);

  useEffect(() => {
	return createWebSocket(`order_book_${symbol}`, orderBookOnMessage(setOrders))
  }, [symbol]);

  const { bids, asks } = orders;

  return (
    <Stack>
      <Title order={3}>Order Book</Title>
        <ExchangeTable title={"bids"} currencyArray={currencyArray} arr={bids} color={colors.green(1)} />
        <ExchangeTable title={"asks"} currencyArray={currencyArray} arr={asks} color={colors.red(1)} />
    </Stack>
  );
};

export default OrderBook;
