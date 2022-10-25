// export const finchartOnMessage = (price, interval, setData) => {
// 	if (price === undefined) return
// 	setData(data => {
// 		const msi = interval * 1000
// 		var time = parseInt(newOrder.time)
// 		time = Math.floor(time / msi) * msi
// 		const currentMinData = data[data.length - 1]
// 		console.log(currentMinData)
// 		const lastTime = currentMinData.time.getTime()
// 		if (lastTime === time) {
// 			currentMinData.high = price > currentMinData.high ? price : currentMinData.high
// 			currentMinData.low = price < currentMinData.low ? price : currentMinData.low
// 			currentMinData.close = price
// 			return [...data.slice(0, -1), currentMinData]
// 		} else {
// 			const newMinData = ({
// 				time: new Date(time),
// 				open: price,
// 				high: price,
// 				low: price,
// 				close: price,
// 			})
// 			return [...data, newMinData]
// 		}
// 	})
// }