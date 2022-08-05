import { gql } from "@apollo/client";

export const MARKET_HISTORY_QUERY = gql`
	query GetMarketHistoryForSymbol($symbol: String!) {
		getMarketHistoryForSymbol(symbol: $symbol) {
			time
			open
			close
			high
			low
			volume
		}
	}
`

export const MARKET_HISTORY_SUBSCRIPTION = gql`
    subscription OnMarketHistoryUpdate($symbol: String!) {
    	updateMarketHistory(symbol: $symbol) {
			time
			open
			close
			high
			low
			volume
		}
    }
`