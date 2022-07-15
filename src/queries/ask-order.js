import { gql } from "@apollo/client";

export const ASK_ORDER_BOOK_QUERY = gql`
    query GetOpenAskOrdersForSymbol($symbol: String!) {
        getOpenAskOrdersForSymbol(symbol: $symbol) {
            price
            openquantity
        }
    }
`

export const ASK_ORDER_BOOK_SUBSCRIPTION = gql`
    subscription OnAskOrderUpdate($symbol: String!) {
        newAskOpenOrder(symbol: $symbol) {
            price
            openquantity
        }
    }
`