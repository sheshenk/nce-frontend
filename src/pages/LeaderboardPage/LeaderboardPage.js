import { useQuery } from "@apollo/client";
import { Container, Space, Table } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PARTICIPANTS } from "../../queries/contest";
import Chart from "react-apexcharts";
import "./LeaderboardPage.css"

export default function LeaderboardPage({ user }) {
    const { name } = useParams()
    const [leaderboard, setLeaderboard] = useState([])
    const { loading: participantloading, error: participantError, data: participantData } = useQuery(GET_PARTICIPANTS, { variables: { contestname: name, userid: -1 } })

    useEffect(() => {
        if (participantloading) { console.log("loading leaderboard"); }
        else if (participantError) { console.log(participantError); setLeaderboard([]) }
        else { console.log(participantData.getParticipants); setLeaderboard(participantData.getParticipants) }
    }, [participantloading, participantError, participantData])

    return (
        <div className="container">
            <div className="back-to-contest">
                <Link to="../" style={{ color: '#afafaf' }}>
                    ◀ &nbsp;Back to Contest
                </Link>
            </div>
            <h2 className="h2 ranking-title-wrapper">
                <span>Ranking of&nbsp;<a href={"/contest/" + name}>{name.toUpperCase().split("_").join(" ")}</a>&nbsp;&nbsp;</span>
            </h2>
            <div className="callout callout-info">
                <h4>Instructions</h4><span><p>After the contest is finished, you can view others' ranking and P/L trend</p>
                    <p>If you suspect a user cheats by using an <i>explicitly</i> disallowed library function or copying code from other resources,<br /> please report it by clicking on the "Report Cheating" toggle under the suspicious solution.</p></span>
            </div>
            <Space />
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Cumulative P/L</th>
                        <th>Maximum Drawdown</th>
                        <th>P/L Trend</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.return}</td>
                            <td>{item.maxdrawdown}</td>
                            <td>{<PLChart pltrend={item.pltrend} />}</td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </div>
    )
}

function PLChart({ pltrend }) {
    return (
        <Container >
            <Chart
                options={{
                    chart: {
                        id: "P/L Trend",
                        group: "FearBTC",
                        type: 'line',
                        height: 160
                    },
                    xaxis: {
                        type: 'numeric',
                    },
                    tooltip: {
                        custom: function ({ seriesIndex, dataPointIndex, w }) {
                            var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];;
                            return data.y
                        }
                    },
                    colors: ['#85bb65']
                }}
                series={[{
                    data: pltrend.map((d, index) => { return { x: index + 1, y: d } })
                }]}
                type="line"
                width="300px"
            />
        </Container>
    )
}