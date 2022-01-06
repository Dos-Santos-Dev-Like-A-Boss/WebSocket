export function stocksSelector(state) {
    const {prev, curr} = state.data;
    return curr.map(({ticker, price, change_percent, dividend}) => {
        const prevPrice = prev.find(item => item.ticker === ticker)?.price;
        return {change_percent, dividend, ticker, price, color: prevPrice > price ? 'red' : 'green'}
    })
}