import { useQuery } from '@apollo/client'
import { Stack } from "@mantine/core";
import React, { useEffect } from "react";
import { CLOSED_ORDER_USER_QUERY, OPEN_ASK_ORDER_USER_QUERY, OPEN_BID_ORDER_USER_QUERY } from '../../../queries/OrdersAndWallets'
import { getOrderHandler } from '../../../services/orderHandlers';
import ClosedOrdersTableGenerator from '../TableGenerator/ClosedOrdersTableGenerator'
import OpenOrdersTableGenerator from '../TableGenerator/OpenOrdersTableGenerator';

const UserOrdersComponent = ({ symbol, owner, closedOrders, setClosedOrders, openAskOrders, setOpenAskOrders, openBidOrders, setOpenBidOrders }) => {

  const { loading: closeQueryloading, error: closeQueryError, data: closeQueryData } = useQuery(CLOSED_ORDER_USER_QUERY, { variables: { symbol, owner } });

  useEffect(() => {
    try {
      if (closeQueryData !== undefined && closeQueryData.getClosedOrdersForSymbolAndUser) {
        const res = closeQueryData.getClosedOrdersForSymbolAndUser
        const R1 = res.map(d => ({ ...d, createdat: new Date(parseInt(d.createdat)).toLocaleString("en-US") }))
        const R2 = R1.map(d => ({ ...d, filledat: new Date(parseInt(d.filledat)).toLocaleString("en-US") }))
        const R3 = R2.map(obj => {
          if (obj.buyside === "BUY") {
            return { ...obj, action: 'BUY' };
          }
          else if (obj.buyside === "SELL") {
            return { ...obj, action: 'SELL' };
          }
          return obj;
        });
        const R4 = R3.map(({ orderid, action, quantity, price, fillprice, createdat, filledat, ...del_attrs }) => ({ orderid, action, quantity, price, fillprice, createdat, filledat }))
        const R5 = R4.map(item => {
          const { fillprice: fill_price, createdat: created_at, filledat: filled_at, ...rest } = item;
          return { ...rest, fill_price, created_at, filled_at }
        }
        );
        // console.log("CLOSED ORDERS R5",R5)
        setClosedOrders(R5)
      }
    } catch (error) { }
  }, [symbol, closeQueryloading, closeQueryError, closeQueryData, setClosedOrders])


  const { loading: openAskQueryloading, error: openAskQueryError, data: openAskQueryData } = useQuery(OPEN_ASK_ORDER_USER_QUERY, { variables: { symbol, owner } });

  useEffect(() => {
    try {
      if (openAskQueryData !== undefined && openAskQueryData.getOpenAskOrdersForSymbolAndUser) {
        const res = openAskQueryData.getOpenAskOrdersForSymbolAndUser
        const R1 = res.map(d => ({ ...d, createdat: new Date(parseInt(d.createdat)).toLocaleString("en-US") }))
        const R2 = R1.map(d => ({ ...d, updatedat: new Date(parseInt(d.updatedat)).toLocaleString("en-US") }))
        const R3 = R2.map(({ orderid, quantity, price, openquantity, fillcost, createdat, updatedat, ...del_attrs }) => ({ orderid, quantity, price, openquantity, fillcost, createdat, updatedat }))
        const R4 = R3.map(item => {
          const { openquantity: open_quantity, fillcost: fill_cost, createdat: created_at, updatedat: updated_at, ...rest } = item;
          return { ...rest, open_quantity, fill_cost, created_at, updated_at }
        }
        );
        // console.log("OPEN ASK R4", R4)
        setOpenAskOrders(R4)
      }
    } catch (error) { }
  }, [symbol, openAskQueryloading, openAskQueryError, openAskQueryData, setOpenAskOrders])

  const { loading: openBidQueryloading, error: openBidQueryError, data: openBidQueryData } = useQuery(OPEN_BID_ORDER_USER_QUERY, { variables: { symbol, owner } });

  useEffect(() => {
    try {
      if (openBidQueryData !== undefined && openBidQueryData.getOpenBidOrdersForSymbolAndUser) {
        const res = openBidQueryData.getOpenBidOrdersForSymbolAndUser
        const R1 = res.map(d => ({ ...d, createdat: new Date(parseInt(d.createdat)).toLocaleString("en-US") }))
        const R2 = R1.map(d => ({ ...d, updatedat: new Date(parseInt(d.updatedat)).toLocaleString("en-US") }))
        const R3 = R2.map(({ orderid, quantity, price, openquantity, fillcost, createdat, updatedat, ...del_attrs }) => ({ orderid, quantity, price, openquantity, fillcost, createdat, updatedat }))
        const R4 = R3.map(item => {
          const { openquantity: open_quantity, fillcost: fill_cost, createdat: created_at, updatedat: updated_at, ...rest } = item;
          return { ...rest, open_quantity, fill_cost, created_at, updated_at }
        }
        );
        console.log("OPEN BID R4", R4)
        setOpenBidOrders(R4)
      }
    } catch (error) { }
  }, [symbol, openBidQueryloading, openBidQueryError, openBidQueryData, setOpenBidOrders])

  // console.log(closedOrders.length, openAskOrders.length, openBidOrders.length)

  useEffect(() => {
    getOrderHandler(owner, symbol, setOpenAskOrders, setOpenBidOrders, setClosedOrders)
  }, [owner, symbol, setOpenAskOrders, setOpenBidOrders, setClosedOrders])

  return (
    <div>
      <Stack>
        {closedOrders.length > 0 &&
          <ClosedOrdersTableGenerator DataObject={closedOrders} title={"CLOSED ORDERS"} />
        }
        {openAskOrders.length > 0 &&
          <OpenOrdersTableGenerator owner={owner} DataObject={openAskOrders} setAsks={setOpenAskOrders} setBids={setOpenBidOrders} setClosed={setClosedOrders} title={"OPEN ASK ORDERS"} symbol={symbol} side={'SELL'} />
        }
        {openBidOrders.length > 0 &&
          <OpenOrdersTableGenerator owner={owner} DataObject={openBidOrders} setAsks={setOpenAskOrders} setBids={setOpenBidOrders} setClosed={setClosedOrders} title={"OPEN BID ORDERS"} symbol={symbol} side={'BUY'} />
        }
      </Stack>
    </div>
  )

};

export default UserOrdersComponent;
