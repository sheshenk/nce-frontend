import { useQuery } from "@apollo/client";
import { Table } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PARTICIPANTS } from "../../queries/contest";

export default function LeaderboardPage() {
    const { id } = useParams()
    const [leaderboard, setLeaderboard] = useState([])
    const { loading: queryloading, error: queryError, data: queryData } = useQuery(GET_PARTICIPANTS, { variables: { contestid: id } })
    useEffect(() => {
        if (queryloading) { }
        else if (queryError) setLeaderboard([])
        else setLeaderboard(queryData.getParticipants)
    }, [queryloading, queryError, queryData])
    return (
        <div className="container">
            <h1 className="h2 ranking-title-wrapper">
                <span>Ranking of&nbsp;<a href={"/contest/" + id} style={{ textDecoration: "none" }}>Weekly Contest {id}</a>&nbsp;&nbsp;</span>
            </h1>
            <div className="back-to-contest" style={{
                fontWeight: 500,
                fontSize: '16px'
            }}>
                <Link to="../" style={{ color: '#afafaf', textDecoration: 'none' }}>
                    ◀ &nbsp;Back to Contest
                </Link>
            </div>
            <div className="callout callout-info"><h4>Instructions</h4><span><p>After the contest is finished, you can view others' ranking</p><p>If you suspect a user cheats by using an <i>explicitly</i> disallowed library function or copying code from other resources, <br />please report it by clicking on the "Report Cheating" toggle under the suspicious solution.</p></span></div>
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Cumulative P/L</th>
                        <th>Sharpe Ratio</th>
                        <th>Maximum Drawdown</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.return}</td>
                            <td>{item.sharpe_ratio}</td>
                            <td>{item.maxdrawdown}</td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </div>
    )
}