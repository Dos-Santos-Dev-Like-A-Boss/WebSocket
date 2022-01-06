import React from 'react';
import style from './price-label.module.scss';
import {arrowDown} from '../../images/arrowDown';
import {arrowUp} from '../../images/arrowUp';
import clsx from 'clsx';

export const PriceLabel = ({price, ticker, color, dividend, change_percent}) => {
    const currentIcon = color === 'red' ? arrowDown : arrowUp;
    const currentColor = color === 'red' ? style.redBackground : style.greenBackground;
    const plusOrMinus = color === 'red' ? '-' : '+';

    const unsubscribeHandler = () => {
        fetch(`http://localhost:4000/api/unsubscribe/${ticker}`, {
            method: "POST"
        });
    }

    return (
        <div data-testid="price-label" data-ticker={ticker} className={style.priceWrapper}>
            <div data-testid={`price-label-color-${price}-${ticker}`} className={clsx(style.icon, currentColor)}>
                <span className={style.svgWrapper}>
                {currentIcon}
                </span>
            </div>
            <section data-testid={`section-${price}-${ticker}`} className={style.price}>
                <div>{ticker}</div>
                <div>{price}</div>
            </section>
            <section className={clsx(style.priceChange, currentColor)}>
                <div>{plusOrMinus}{change_percent}</div>
                <div>{plusOrMinus}{dividend}</div>
            </section>
            <div className={style.unsubscribeButton} onClick={unsubscribeHandler}>+</div>
        </div>
    )
}