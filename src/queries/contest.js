import { gql } from "@apollo/client";

export const GET_PARTICIPANTS = gql`
	query GetParticipants($contestid: ID!) {
		getParticipants(contestid:$contestid) {
			userid
			name
			return
			sharpe_ratio
			maxdrawdown
		}
	}
`


export const GET_CONTESTS = gql`
	query GetContests {
		getContests {
            id
            name
            symbol
            startat
            endat
		}
	}
`