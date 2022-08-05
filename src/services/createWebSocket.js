const createWebSocket = (channel, onmessage) => {
	const ws = new WebSocket("wss://ws.bitstamp.net");
	ws.onopen = () => ws.send(JSON.stringify({ event: 'bts:subscribe', data: { channel: channel } }))
	ws.onmessage = onmessage
	ws.onclose = () => ws.close()
	return () => ws.close()
}

export const finchartOnMessage = (newMarketHistory, interval, setData) => {
	setData(data => {
		const msi = interval * 1000
		var time = parseInt(newMarketHistory.time)
		time = Math.floor(time / msi) * msi
		const currentMinData = data[data.length - 1]
		console.log(currentMinData)
		const lastTime = currentMinData.time.getTime()
		if (lastTime === time) {
			// currentMinData.high = price > currentMinData.high ? price : currentMinData.high
			// currentMinData.low = price < currentMinData.low ? price : currentMinData.low
			// currentMinData.close = price
			// currentMinData.volume += quantity
			return [...data.slice(0, -1), currentMinData]
		} else {
			const newMinData = ({
				...newMarketHistory,
				time: new Date(time)
			})
			return [...data, newMinData]
		}
	})
}

export const orderBookOnMessage = (setOrders) => e => {
	const response = JSON.parse(e.data).data
	setOrders(orders => {
		return response
	})
}

export default createWebSocket