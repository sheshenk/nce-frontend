import { gql } from "@apollo/client";

export const ALL_NEWS_QUERY = gql`
    query GetNews($number: Int) {
        getNews(number: $number) {
        time
        header
        details
        symbol
        }
    }
`

export const SYMBOL_NEWS_QUERY = gql`
    query GetNews($symbol: String, $number: Int) {
        getNews(symbol: $symbol, number: $number) {
        time
        header
        details
        symbol
        }
    }
`

export const SYMBOL_NEWS_SUBSCRIPTION = gql`
    subscription OnNewNews($symbol: String, $number: Int) {
        getNews(symbol: $symbol, number: $number) {
            time
            header
            details
            symbol
            }
    }
`