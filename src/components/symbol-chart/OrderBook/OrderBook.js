import { Stack, Title, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { colors } from "../../../constants/colors";
// import createWebSocket, { orderBookOnMessage } from "../../../services/createWebSocket";
import { ExchangeTable } from "../ExchangeTable/ExchangeTable";
// import { useQuery } from '@apollo/client'
// import { ASK_ORDER_BOOK_QUERY, ASK_ORDER_BOOK_SUBSCRIPTION } from "../../../queries/ask-order.js";
// import { BID_ORDER_BOOK_QUERY, BID_ORDER_BOOK_SUBSCRIPTION } from "../../../queries/bid-order.js";

// export class OrderBook extends Component {
//   currencyArray = this.props.symbol.toUpperCase().match(/.{1,3}/g);

//   constructor(props) {
//     super(props);
//     this.state = {
//       asks: [],
//       bids: []
//     };
//   }

//   render() {
//     return (
//       <Stack>
//         <Title order={3}>Order Book</Title>
//         {asks ? <ExchangeTable title={"asks"} currencyArray={currencyArray} arr={asks} color={colors.red(1)} /> : <div>Empty Ask OrderBook</div>}
//         {bids ? <ExchangeTable title={"bids"} currencyArray={currencyArray} arr={bids} color={colors.green(1)} /> : <div>Empty Bid OrderBook</div>}
//       </Stack>
//     );
//   }
// }

const OrderBook = ({ symbol }) => {
  const currencyArray = symbol.toUpperCase().match(/.{1,3}/g);

  const [asks, setAsks] = useState([])
  const [bids, setBids] = useState([])
  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8000/realorderbook");

  sendMessage(JSON.stringify({ product_id: symbol.toUpperCase() }))

  useEffect(() => {
    if (lastMessage !== null) {
      let res = JSON.parse(lastMessage.data)
      setAsks(res.asks)
      setBids(res.bids)
    }
  }, [lastMessage]);

  return (
    <Stack>
      <Title order={3}>Order Book</Title>
      {readyState !== ReadyState.OPEN ? <Text>Loading...</Text> : asks ? <ExchangeTable title={"asks"} currencyArray={currencyArray} arr={asks} color={colors.red(1)} /> : <div>Empty Ask OrderBook</div>}
      {readyState !== ReadyState.OPEN ? <Text>Loading...</Text> : bids ? <ExchangeTable title={"bids"} currencyArray={currencyArray} arr={bids} color={colors.green(1)} /> : <div>Empty Bid OrderBook</div>}
    </Stack>
  );
};

export default OrderBook;
