import { Stack, Title } from "@mantine/core";
import React from "react";
import { colors } from "../../../constants/colors";
// import createWebSocket, { orderBookOnMessage } from "../../../services/createWebSocket";
import { ExchangeTable } from "../ExchangeTable/ExchangeTable";
import { useQuery } from '@apollo/client'
import { ASK_ORDER_BOOK_QUERY, ASK_ORDER_BOOK_SUBSCRIPTION } from "../../../queries/ask-order.js";
import { BID_ORDER_BOOK_QUERY, BID_ORDER_BOOK_SUBSCRIPTION } from "../../../queries/bid-order.js";

const OrderBook = ({ symbol }) => {
  const currencyArray = symbol.toUpperCase().match(/.{1,3}/g);

  const { subscribeToMore: subscribeToAsk, ...asks } = useQuery(ASK_ORDER_BOOK_QUERY, { variables: { symbol: symbol, number: 4 } })
  const { subscribeToMore: subscribeToBid, ...bids } = useQuery(BID_ORDER_BOOK_QUERY, { variables: { symbol: symbol, number: 4 } })

  return (
    <Stack>
      <Title order={3}>Order Book</Title>
      {asks.data ? (asks.data.getOpenAskOrdersForSymbol ?
        <ExchangeTable title={"asks"} currencyArray={currencyArray} arr={asks.data ? asks.data.getOpenAskOrdersForSymbol.map((order) => [order.price, order.openquantity]) : []} color={colors.red(1)}
          subscribeToNewOrderBook={
            () => subscribeToAsk({
              document: ASK_ORDER_BOOK_SUBSCRIPTION,
              variables: { symbol },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !subscriptionData.data.getOpenAskOrdersForSymbol) return prev
                return subscriptionData.data
              }
            })
          }
        />
        : <div>Empty Ask OrderBook</div>) : (
        <div>No Asks</div>
      )}
      {bids.data ? (bids.data.getOpenBidOrdersForSymbol ?
        <ExchangeTable title={"bids"} currencyArray={currencyArray} arr={bids.data ? bids.data.getOpenBidOrdersForSymbol.map((order) => [order.price, order.openquantity]) : []} color={colors.green(1)}
          subscribeToNewOrderBook={
            () => subscribeToBid({
              document: BID_ORDER_BOOK_SUBSCRIPTION,
              variables: { symbol: symbol },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !subscriptionData.data.getOpenBidOrdersForSymbol) return prev
                return subscriptionData.data
              }
            })
          }
        />
        : <div>Empty Bid OrderBook</div>) : (
        <div>No Bids</div>
      )}

    </Stack>
  );
};

export default OrderBook;
