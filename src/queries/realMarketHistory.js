import { gql } from "@apollo/client";

export const REAL_MARKET_HISTORY_QUERY = gql`
	query GetRealMarketHistoryForSymbol($symbol: String!) {
		getrRealMarketHistoryForSymbol(symbol: $symbol) {
			time
			open
			close
			high
			low
			volume
		}
	}
`