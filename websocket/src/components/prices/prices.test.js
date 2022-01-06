import {render, screen} from '@testing-library/react'
import {Provider} from "react-redux";
import {configureStore} from "../../store/store";
import {Prices} from "./prices";

const initialState = {
    data: {
        prev: [],
        curr: [],
    }
};

const TICKER_1_PRICE = "157.46";
const TICKER_1_NAME = 'AAPL';

describe("Prices Component test", () => {

    let store;
    let element;
    beforeEach(() => {
        store = configureStore(initialState);
        element = render(
            <Provider store={store}>
                <Prices/>
            </Provider>
        );
        store.dispatch({
            type: "CHANGE",
            payload: [{
                price: "157.46",
                ticker: "AAPL"
            }]
        })
    })

    it('should be of expected color', async () => {
        const el = await screen.findByTestId(`price-label-color-${TICKER_1_PRICE}-${TICKER_1_NAME}`);
        expect(el.className).toContain("greenBackground");
    });

    it('should change the color to red if price decreases', async () => {
        const decreasedPrice = '137.46';
        store.dispatch({
            type: "CHANGE",
            payload: [{
                price: decreasedPrice,
                ticker: "AAPL"
            }]
        })
        const el = await screen.findByTestId(`price-label-color-${decreasedPrice}-${TICKER_1_NAME}`);
        expect(el.className).toContain("redBackground");
    });

    it('should change the color to green if price increases', async () => {
        const increasedPrice = '200';
        store.dispatch({
            type: "CHANGE",
            payload: [{
                price: increasedPrice,
                ticker: "AAPL"
            }]
        })
        const el = await screen.findByTestId(`price-label-color-${increasedPrice}-${TICKER_1_NAME}`);
        expect(el.className).toContain("greenBackground");

    });

    it('should add another ticker on specified event and store 2 tickers', async () => {
        const newPrice = '200';
        const newTicker = "TEST";
        store.dispatch({
            type: "CHANGE",
            payload: [
                {
                    ticker: TICKER_1_NAME,
                    price: TICKER_1_PRICE,
                },
                {
                    price: newPrice,
                    ticker: newTicker,
                }
            ]
        })
        const [el1, el2] = await Promise.all([
            screen.findByTestId(`section-${TICKER_1_PRICE}-${TICKER_1_NAME}`),
            screen.findByTestId(`section-${newPrice}-${newTicker}`),
        ]);

        expect(el1).toBeTruthy();
        expect(el2).toBeTruthy();
    })
})