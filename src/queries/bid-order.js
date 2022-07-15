import { gql } from "@apollo/client";

export const BID_ORDER_BOOK_QUERY = gql`
    query GetOpenBidOrdersForSymbol($symbol: String!) {
        getOpenBidOrdersForSymbol(symbol: $symbol) {
            price
            openquantity
        }
    }
`

export const BID_ORDER_BOOK_SUBSCRIPTION = gql`
    subscription OnBidOrderUpdate($symbol: String!) {
        newBidOpenOrder(symbol: $symbol) {
            price
            openquantity
        }
    }
`