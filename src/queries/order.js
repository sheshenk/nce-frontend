import { gql } from "@apollo/client";

export const ADD_ORDER_MUTATION = gql`
	mutation CreateOrder($symbol: String!, $type: String!, $side: String!, $quantity: Float!, $price: Float!, $ownerID: Int!, $walletID: Int!) {
        createOrder(symbol: $symbol, type: $type, side: $side, quantity: $quantity, price: $price, ownerID: $ownerID, walletID: $walletID) {
            status
            response
            error
        }
	}
`