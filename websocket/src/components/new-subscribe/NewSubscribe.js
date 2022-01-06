import {TextField} from "@material-ui/core";
import {useState} from "react";
import style from './newSubscribe.module.scss'

export const NewSubscribe = () => {
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState(false)
    const unsubscribeHandler = async (ticker) => {
        const data = await fetch(`http://localhost:4000/api/subscribe/${ticker}`, {
            method: "POST"
        });
        if (data.status === 400) {
            setError(true)
        } else {
            setError(false)
        }
    }
    const onChangeHandler = e => setInputValue(e.target.value.toUpperCase())


    const onEnterHandler = e => {
        if (inputValue && e.keyCode === 13) {
            unsubscribeHandler(inputValue)
            setInputValue("")
        }
    }

    const helperText = `Unable to subscribe to this qoute because you are already subscribed`

    return (
        <div className={style.wrapper}>
            <TextField value={inputValue}
                       error={error}
                       helperText={error && helperText}
                       onChange={onChangeHandler}
                       onKeyDown={onEnterHandler}
                       label={'Quote searcher'}
                       className={style.input}
                       placeholder={'Enter the name of the quote'}
            />
        </div>

    )

}