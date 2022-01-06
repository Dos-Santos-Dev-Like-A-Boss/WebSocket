const initialState = 5;

export const changeIntervalReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case 'CHANGE_INTERVAL' :
            return payload
        default :
            return initialState
    }
}
