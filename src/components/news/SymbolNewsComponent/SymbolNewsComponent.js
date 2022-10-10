import { SYMBOL_NEWS_QUERY, SYMBOL_NEWS_SUBSCRIPTION } from "../../../queries/news";
import React, { useState, useEffect } from "react";
import { useQuery} from '@apollo/client'
import NewsTableGenerator from '../NewsTableGenerator/NewsTableGenerator';

export default function SymbolNewsComponent({symbol}) {
	const [News, setNews] = useState([])
	const { loading: queryloading, error: queryError, data: queryData } = useQuery(SYMBOL_NEWS_QUERY, { variables: { symbol: symbol, number: 5 } });
	// console.log("News ",queryData)
	useEffect(() => {
		try {
			if (queryData !== undefined && queryData.getNews) {
				const res = queryData.getNews
                const R1 = res.map(({ time, header, details, ...del_attrs }) => ({ time, header, details }))
				const R2 = R1.map(d => ({ ...d, time: new Date(parseInt(d.time)).toLocaleString("en-US") }))
				setNews(R2)
			}
		} catch (error) {}
	}, [queryloading, queryError, queryData])
    // console.log(News)

	if(News.length) return (<NewsTableGenerator DataObject = {News} title = {"NEWS"}/>)
	else return (<div>NO News TO DISPLAY</div>)
}
