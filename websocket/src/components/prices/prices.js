import React from "react";
import {PriceLabel} from "../price-label/price-label";
import {useSelector} from "react-redux";
import {stocksSelector} from "../../store/selectors/stockSelector";

export const Prices = () => {
    const data = useSelector(stocksSelector);
    return (
        <>
            {data.map((el) => (
                <PriceLabel key={el.ticker}
                            ticker={el.ticker}
                            price={el.price}
                            color={el.color}
                            change_percent={el.change_percent}
                            dividend={el.dividend}
                />)
            )}
        </>
    )
}