import {io} from "socket.io-client"

export const changeDataAction = (payload) => {
    return {
        type: 'CHANGE',
        payload,
    }
}

export const thunkCreator = () => {
    return function (dispatch) {
        const socket = io('http://localhost:4000/')
        socket.on("ticker", (data) => {
            dispatch(changeDataAction(data));
        })
        socket.emit("start")
    }
}