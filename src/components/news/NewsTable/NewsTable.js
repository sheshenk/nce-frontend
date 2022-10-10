// import { Card, Stack, Table, Title } from "@mantine/core";
import { ALL_NEWS_QUERY } from "../../../queries/news";
import React, { useState, useEffect } from "react";
import { useQuery} from '@apollo/client'
import NewsTableGenerator from '../NewsTableGenerator/NewsTableGenerator';

export default function NewsTable() {
	const [News, setNews] = useState([])
	const { loading: queryloading, error: queryError, data: queryData } = useQuery(ALL_NEWS_QUERY);
	// console.log("News ",queryData)
	useEffect(() => {
		try {
			if (queryData !== undefined && queryData.getNews) {
				const res = queryData.getNews
                const R1 = res.map(({ time, header, details, symbol, ...del_attrs }) => ({ time, header, details, symbol }))
				const R2 = R1.map(d => ({ ...d, time: new Date(parseInt(d.time)).toLocaleString("en-US") }))
				setNews(R2)
			}
		} catch (error) {}
	}, [queryloading, queryError, queryData])
    // console.log(News)

	if(News.length) return (<NewsTableGenerator DataObject = {News} title = {"NEWS"}/>)
	else return (<div>NO News TO DISPLAY</div>)
}