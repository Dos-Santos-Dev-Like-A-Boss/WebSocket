import {combineReducers} from 'redux';
import {changeDataReducer} from './reducers/changeDataReducer';
import {changeIntervalReducer} from "./reducers/changeIntervalReducer";

const reducers = combineReducers({
    data: changeDataReducer,
    interval: changeIntervalReducer,
});

export default reducers;