import { gql } from "@apollo/client";

export const GET_PARTICIPANTS = gql`
	query GetParticipants($contestname: String!, $userid: ID!) {
		getParticipants(contestname:$contestname, userid:$userid) {
			userid
			name
			return
			maxdrawdown
			pltrend
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

// export const GET_PARTICIPANT_PL = gql`
// 	query GetParticipantPL($contestName: string!, userid: ID!) {
// 		getParticipantPL(contestName:$contestName, userid:$userid){
// 			pl
// 		}
// 	}
// `
