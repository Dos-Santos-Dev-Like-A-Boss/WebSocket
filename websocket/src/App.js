import style from './App.module.scss';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {thunkCreator} from './store/actions/changeDataAction'
import {Prices} from "./components/prices/prices";
import {ChangeInterval} from "./components/changeg-interval/ChangeInterval";
import {NewSubscribe} from "./components/new-subscribe/NewSubscribe";


const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkCreator())
    }, [dispatch]);

    return (
        <>
            <div className={style.App}>
                <Prices/>
            </div>
            <div className={style.configuration}>
                <ChangeInterval/>
            </div>
            <NewSubscribe/>
        </>
    );
}
export default App
