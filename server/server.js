'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

class TickerServer {

    constructor() {
        this._allTickers = [
            'AAPL', // Apple
            'GOOGL', // Alphabet
            'MSFT', // Microsoft
            'AMZN', // Amazon
            'FB', // Facebook
            'TSLA', // Tesla
        ];
        this.currentTickers = [...this._allTickers];
        this.tickerInterval = null;
        this.socketInstance = null;
        this.fetchInterval = 5000;
    }

    getQuoutes = () => {
        const quotes = this.currentTickers.map(ticker => ({
            ticker,
            exchange: 'NASDAQ',
            price: this.randomValue(100, 300, 2),
            change: this.randomValue(0, 200, 2),
            change_percent: this.randomValue(0, 1, 2),
            dividend: this.randomValue(0, 1, 2),
            yield: this.randomValue(0, 2, 2),
            last_trade_time: this.utcDate(),
        }));

        this.socketInstance.emit('ticker', quotes);
    }

    trackTickers = () => {
        // run the first time immediately
        this.getQuoutes();

        clearInterval(this.tickerInterval)

        // every N seconds
        this.tickerInterval = setInterval(() => {
            this.getQuoutes();
        }, this.fetchInterval);

        this.socketInstance.on('disconnect', () => {
            clearInterval(this.tickerInterval);
        });
    }

    randomValue = (min = 0, max = 1, precision = 0) => {
        const random = Math.random() * (max - min) + min;
        return random.toFixed(precision);
    }

    utcDate = () => {
        const now = new Date();
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    }
}

const tickerServer = new TickerServer();
const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
    cors: {
        origin: "*",
    }
});

app.post("/api/set-ticker-interval/:interval", (req, res) => {
    const {params: {interval = 5000}} = req;
    tickerServer.fetchInterval = interval;
    tickerServer.trackTickers();
    res.sendStatus(204);
});

app.post("/api/unsubscribe/:ticker", (req, res) => {
    const {params: {ticker}} = req;
    if (!tickerServer.currentTickers.includes(ticker)) {
        res.status(400).send(`Cannot unsubscribe from ${ticker} since it doesn't exist`);
    } else {
        tickerServer.currentTickers = tickerServer.currentTickers.filter(t => t !== ticker);
        tickerServer.trackTickers();
        res.sendStatus(204);
    }
});

app.post("/api/subscribe/:ticker",(req, res) => {
    const {params: {ticker}} = req;
    if (tickerServer.currentTickers.includes(ticker)) {
        res.status(400).send(`Unable to subscribe to ${ticker} because you are already subscribed`);
    } else {
        tickerServer.currentTickers = [...tickerServer.currentTickers, ticker]
        tickerServer.trackTickers();
        res.sendStatus(204);
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
    socket.on('start', () => {
        tickerServer.socketInstance = socket;
        tickerServer.trackTickers();
    });
});

server.listen(PORT, () => {
    console.log(`Streaming service is running on http://localhost:${PORT}`);
});
