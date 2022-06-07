const createWebSocket = (channel, onmessage) => {
	const ws = new WebSocket("wss://ws.bitstamp.net");
	ws.onopen = () =>  ws.send(JSON.stringify({ event: 'bts:subscribe', data: { channel: channel } }))
	ws.onmessage = onmessage
	ws.onclose = () => ws.close()
	return () => ws.close()
}

export const finchartOnMessage = (interval, setData) => e => {
	const wsData = JSON.parse(e.data).data
	const price = wsData.price
	const amount = wsData.amount
	if (price === undefined) return
	setData(data => {
		const msi = interval * 1000
		var time = parseInt(wsData.timestamp) * 1000
		time = Math.floor(time / msi) * msi
		const currentMinData =  data[data.length - 1]
		const lastTime = currentMinData.date.getTime()
		if (lastTime === time) {
			currentMinData.high = price > currentMinData.high ? price : currentMinData.high
			currentMinData.low = price < currentMinData.low ? price : currentMinData.low
			currentMinData.close = price
			currentMinData.volume += amount
			return [...data.slice(0, -1), currentMinData]
		} else {
			const newMinData = ({
				date: new Date(time),
				open: price,
				high: price,
				low: price,
				close: price,
				volume: amount
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