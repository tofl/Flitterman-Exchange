# FlittermanExchange

This is an experimental project meant to test the Alpha Vantage API as well as the NV3 Javascript charts library.

![Homepage of the app](https://raw.githubusercontent.com/tofl/Flitterman-Exchange/master/fex_home.png)

## What I learned
Alpha Vantage is a great API as it is capable of providing information on a given company's shares. Unfortunately it was also very badly designed. I had to create a whole layer to almost entirely reformat the API to my needs. The JSON body of the API currently looks like this :

```
"Time Series (5min)": {
        "2019-01-18 16:00:00": {
            "1. open": "107.3300",
            "2. high": "107.7800",
            "3. low": "107.3137",
            "4. close": "107.6900",
            "5. volume": "1628620"
        },
        ...
}
```

This is not very practical. First of all, the main key (`Time Series (5min)`) shouldn't be written in plain text. A more pragmatic format should've been chosen, like `ts_5min` for example. Then, placing every stock prices (open, high, ...) under a key named after the date isn't necessarily suitable. Also, a more conveniant way of doing it is using a timestamp. It's extremely easy to convert a timestamp to a readable format, but the opposite is much harder.

In the end, this is what I believe to be a better format for this API :

```
"ts_5min": {
        0: {
            "datetime": 1547827200
            "open": "107.3300",
            "high": "107.7800",
            "low": "107.3137",
            "close": "107.6900",
            "volume": "1628620"
        },
        ...
}
