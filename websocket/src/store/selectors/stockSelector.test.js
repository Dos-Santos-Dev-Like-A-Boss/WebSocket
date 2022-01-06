import {stocksSelector} from "./stockSelector";

describe('stocksSelector', () => {
    it('should color change by prev and current ', () => {
        const state = {
            data: {
                prev: [{ticker: 'GOGL', price: '254'}],
                curr: [{ticker: 'GOGL', price: '146'}],
            }
        };

        const result = stocksSelector(state)
        const expectedResult = [
            {ticker: 'GOGL', price: '146', color: "red"},
        ];

        expect(result).toEqual(expectedResult);
    })
})