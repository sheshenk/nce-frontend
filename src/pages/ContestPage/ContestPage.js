import { useQuery } from "@apollo/client";
import { Divider, Grid, List, Paper, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_CONTESTS } from "../../queries/contest";

function dataFormat(d) {
    return d.getFullYear() + "-" + ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

}

export default function ContestPage() {
    const [ranking, setRanking] = useState([{ Name: 'Alice', Rating: 98, Attended: 2 }, { Name: 'Bob', Rating: 45, Attended: 1 }, { Name: 'Carol', Rating: 0, Attended: 0 }])
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
    useEffect(() => {
        setRanking([...ranking, ranking[ranking.length - 1]])
    }, [update, ranking])
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
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Start At</th>
                                <th>End At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map(({ id, name, symbol, startat, endat }, index) =>
                                <tr key={index}>
                                    <td><Link to={id} style={{ textDecoration: 'none' }}>{name}</Link></td>
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
                                <div class="flex flex-col space-y-1.5">
                                    <div class="flex items-center space-x-1 transition-colors text-brand-orange dark:text-dark-brand-orange group-hover:text-blue-s dark:group-hover:text-dark-blue-s">
                                        <span class="font-medium">{Name} </span><span>🇺🇸</span></div>
                                    <div class="flex space-x-4 whitespace-nowrap text-xs font-normal">
                                        <div class="flex items-center">
                                            <span class="mr-1 text-base text-gray-5 dark:text-dark-gray-5 lc-xl:hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" width="1em" height="1em" fill="currentColor"><path d="M8 1.947A6.667 6.667 0 108 15.28 6.667 6.667 0 008 1.947zm3.894 10.56A5.49 5.49 0 018 14.122a5.473 5.473 0 01-3.895-1.613 5.49 5.49 0 01-1.613-3.895 5.472 5.472 0 011.613-3.894A5.49 5.49 0 018 3.105a5.471 5.471 0 013.894 1.614 5.49 5.49 0 011.614 3.894 5.472 5.472 0 01-1.614 3.895z"></path><path d="M11.418 10.588h-.295V6.084a.594.594 0 10-1.188 0v4.504H8.6V5.207a.594.594 0 10-1.188 0v5.381H6.007V7.893a.594.594 0 10-1.187 0v2.695h-.226a.594.594 0 100 1.188h6.824a.594.594 0 100-1.188z"></path></svg></span>
                                            <span class="mr-1 hidden lc-md:inline text-label-3 dark:text-dark-label-3">Rating:</span><span class="text-label-1 dark:text-dark-label-1">{Rating}</span></div><div class="flex items-center"><span class="mr-1 text-base text-gray-5 dark:text-dark-gray-5 lc-xl:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path fill-rule="evenodd" d="M8.5 4.587v7.182c0 .575.184 1.463.707 2.18.487.665 1.312 1.251 2.793 1.251 1.48 0 2.306-.586 2.793-1.252.523-.716.707-1.604.707-2.179V4.587a10.732 10.732 0 00-7 0zm-1.557 9.371A5.957 5.957 0 016.5 11.77V8.6c-.536-.116-1.12-.158-1.587-.05-.312.073-.514.198-.644.358C4.14 9.064 4 9.357 4 9.923c0 1.399.848 2.694 2.361 3.687.186.122.38.238.582.348zM6.5 6.566V3.923a1 1 0 01.544-.89C7.779 2.656 9.674 2 12 2c2.325 0 4.221.656 4.956 1.033a1 1 0 01.544.89v2.643c.647-.101 1.364-.122 2.038.035.626.145 1.267.455 1.746 1.045.482.594.716 1.367.716 2.277 0 2.294-1.402 4.137-3.264 5.36-1.609 1.055-3.649 1.716-5.736 1.878V20h4.4a1 1 0 110 2H6.6a1 1 0 110-2H11v-2.839c-2.087-.162-4.127-.823-5.736-1.879C3.402 14.06 2 12.217 2 9.923c0-.91.234-1.683.716-2.277.48-.59 1.12-.9 1.746-1.045.674-.157 1.391-.136 2.038-.035zm11 2.033c.536-.116 1.12-.158 1.587-.05.312.073.515.198.645.358.127.157.268.45.268 1.016 0 1.399-.848 2.694-2.361 3.687-.186.122-.38.238-.582.348a5.956 5.956 0 00.443-2.189V8.6z" clip-rule="evenodd"></path></svg></span>
                                            <span class="mr-1 hidden lc-md:inline text-label-3 dark:text-dark-label-3">Attended:</span><span class="text-label-1 dark:text-dark-label-1">{Attended}</span>
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