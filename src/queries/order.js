import { gql } from "@apollo/client";

export const ADD_ORDER_MUTATION = gql`
    mutation CreateOrder($symbol: String!, $type: String!, $side: String!, $quantity: Float!, $price: Float!, $ownerId: Int!, $walletId: Int!) {
        createOrder(symbol: $symbol, type: $type, side: $side, quantity: $quantity, price: $price, ownerId: $ownerId, walletId: $walletId) {
            status
            response
            error
        }
    }
`
export const CANCEL_ORDER_MUTATION = gql`
    mutation CancelOrder($symbol: String!, $side: String!, $price: Float!, $orderId: String!) {
        cancelOrder(symbol: $symbol, side: $side, price: $price, orderId: $orderId) {
            status
            response
            error
        }
    }
`
export const MODIFY_ORDER_MUTATION = gql`
    mutation ModifyOrder($symbol: String!, $side: String!, $orderId: String!, $prevQuantity: Float!, $prevPrice: Float!, $newQuantity: Float!, $newPrice: Float!) {
        modifyOrder(symbol: $symbol, side: $side, orderId: $orderId, prevQuantity: $prevQuantity, prevPrice: $prevPrice, newQuantity: $newQuantity, newPrice: $newPrice) {
            status
            response
            error
        }
    }
`