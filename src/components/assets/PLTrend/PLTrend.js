import { Card, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function PLTrend({ userid }) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    const getOrderHandler = async (owner) => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:8000/user/pltrend?' + new URLSearchParams({ userid: owner }));
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('result is: ', JSON.stringify(result, null, 4));
            setItems(result)
        } catch (err) {
            return err
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getOrderHandler(userid)
    }, [])

    return (
        <Card withBorder>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <PLChart pltrend={items.map(item => [Date.parse(item.time), parseFloat(item.amount)])} />
        </Card>
    )
}

function PLChart({ pltrend }) {
    return (
        <ReactApexChart options={{
            chart: {
                type: 'area',
                stacked: false,
                height: 300,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: `P/L Trend`,
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                title: {
                    text: 'Total Assets'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
            }
        }} series={[{
            name: "USD($)",
            data: pltrend,
        }]} type="area" height={314} />
    )
}