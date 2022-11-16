export const getOrderHandler = async (owner, symbol, setAsks, setBids, setClosed) => {
    try {
        const response = await fetch('http://localhost:8000/order?' + new URLSearchParams({ symbol: symbol, owner_id: owner }));
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('result is: ', JSON.stringify(result, null, 4));
        setAsks(result.asks.map((item) => {
            return {
                ...item,
                created_at: new Date(Date.parse(item.created_at.replace("Z", "+08:00"))).toLocaleString("en-US"),
                updated_at: new Date(Date.parse(item.updated_at.replace("Z", "+08:00"))).toLocaleString("en-US"),
            }
        }))
        setBids(result.bids.map((item) => {
            return {
                ...item,
                created_at: new Date(Date.parse(item.created_at.replace("Z", "+08:00"))).toLocaleString("en-US"),
                updated_at: new Date(Date.parse(item.updated_at.replace("Z", "+08:00"))).toLocaleString("en-US"),
            }
        }))
        setClosed(result.closed.map((item) => {
            return {
                ...item,
                created_at: new Date(Date.parse(item.created_at.replace("Z", "+08:00"))).toLocaleString("en-US"),
                filled_at: new Date(Date.parse(item.filled_at.replace("Z", "+08:00"))).toLocaleString("en-US")
            }
        }))
    } catch (err) {
        return err
    }
}