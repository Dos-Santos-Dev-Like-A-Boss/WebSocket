import {Slider} from "@material-ui/core";
import {useCallback, useEffect, useState} from "react";
import style from './ChangeInterval.module.scss';
import {debounce} from "lodash";

export const ChangeInterval = () => {
    const [interval, setInterval] = useState(5);

    useEffect(() => {
        updateInterval(interval);
    }, [interval])

    const intervalHandler = (_, value) => setInterval(value)

    const updateInterval = useCallback(debounce(interval => {
        fetch(`http://localhost:4000/api/set-ticker-interval/${interval * 1000}`, {
            method: "POST"
        });
    }, 1000), []);

    return (
        <div className={style.wrapper}>
            <h4>Choice interval for update tickers</h4>
            <h5>Now tickers will update every {interval} sec</h5>
            <Slider
                value={interval}
                min={1}
                max={60}
                step={1}
                onChange={intervalHandler}
                className={style.slider}
            />
        </div>
    )
}