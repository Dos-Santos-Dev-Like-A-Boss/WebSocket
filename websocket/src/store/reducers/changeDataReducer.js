const initialState = {
    prev: [],
    curr: [],
}

export const changeDataReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'CHANGE' :
            return {
                prev: state.curr,
                curr: payload,
            };
        default :
            return initialState
    }
}
