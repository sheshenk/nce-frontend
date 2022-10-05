import { useQuery } from "@apollo/client";
import { Divider, Grid, List, Paper, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_CONTESTS } from "../../queries/contest";

function dataFormat(d) {
    return d.getFullYear() + "-" + ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

}

export default function ContestPage() {
    const [ranking] = useState([{ Name: 'Alice', Rating: 98, Attended: 2 }, { Name: 'Bob', Rating: 45, Attended: 1 }, { Name: 'Carol', Rating: 0, Attended: 0 }])
    const [contests, setContests] = useState([])
    const [update, setUpdate] = useState(true)
    const { loading: contestQueryloading, error: contestQueryError, data: contestQueryData } = useQuery(GET_CONTESTS)
    useEffect(() => {
        if (contestQueryloading) { }
        else if (contestQueryError) setContests([])
        else setContests(contestQueryData.getContests)
    }, [contestQueryloading, contestQueryError, contestQueryData])
    setInterval(() => {
        setUpdate(!update)
    }, 60000)
    return (
        <>
            <Title order={2}>NUSwap Contest</Title>
            <Paper shadow="sm" p="md">
                <Text>Contest every week, compete and see your ranking!</Text>
            </Paper>

            <Divider my="sm" variant="dashed" />
            <Grid gutter="xl">
                <Grid.Col span={7}>
                    <Title order={3}>Past Contest</Title>
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Start At</th>
                                <th>End At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map(({ id, name, symbol, startat, endat }, index) =>
                                <tr key={index}>
                                    <td>{id}</td>
                                    <td><Link to={name.toLowerCase().split(" ").join('_')} style={{ textDecoration: 'none' }}>{name}</Link></td>
                                    <td>{symbol}</td>
                                    <td>{dataFormat(new Date(startat * 1))}</td>
                                    <td>{endat ? dataFormat(new Date(endat * 1)) : "Ongoing..."}</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table >
                </Grid.Col>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={4}>
                    <Title order={3}>Global Ranking</Title>
                    <List spacing="xl"
                        size="xl"
                        center>
                        {ranking.map(({ Name, Rating, Attended }, index) =>
                            <List.Item icon={
                                <ThemeIcon variant="default" radius="xl" size="md" color="teal">
                                    {index + 1}
                                </ThemeIcon>
                            } key={index}>
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex items-center space-x-1 transition-colors text-brand-orange dark:text-dark-brand-orange group-hover:text-blue-s dark:group-hover:text-dark-blue-s">
                                        <span className="font-medium">{Name} </span><span>🇺🇸</span></div>
                                    <div className="flex space-x-4 whitespace-nowrap text-xs font-normal">
                                        <div className="flex items-center">

                                            <span className="mr-1 hidden lc-md:inline text-label-3 dark:text-dark-label-3">Attended:</span><span className="text-label-1 dark:text-dark-label-1">{Attended}</span>
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    </List>
                </Grid.Col>
            </Grid>
        </>
    )
}