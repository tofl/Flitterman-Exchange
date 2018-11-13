import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let d3: any;

import { StocksDataService } from '../stocks-data.service';

@Component({
    selector: 'app-stock-details',
    templateUrl: './stock-details.component.html',
    styleUrls: ['./stock-details.component.scss', '../../../node_modules/nvd3/build/nv.d3.css'],
    encapsulation: ViewEncapsulation.None
})
export class StockDetailsComponent implements OnInit {

    symbol: string;
    options: any;
    data: any;
    loaded = false;

    constructor(private activatedRoute: ActivatedRoute, private stocks: StocksDataService) {}

    ngOnInit() {
        this.symbol = this.activatedRoute.snapshot.paramMap.get('symbol');
        this.buildChart();
        this.getTimeSeries();
    }

    buildChart() {
        this.options = {
          chart: {
            type: 'candlestickBarChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 40,
              left: 60
            },
            x: function(d) { return d['time']; },
            y: function(d) { return d['close']; },
            duration: 100,

            xAxis: {
              axisLabel: 'Dates',
              tickFormat: function(d) {
                  let date = new Date(d * 1000);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return day + '/' + month + '/' + year;
              },
              showMaxMin: false
            },

            yAxis: {
              axisLabel: 'Stock Price',
              tickFormat: function(d) {
                return '$' + d3.format(',.1f')(d);
              },
              showMaxMin: false
            },
            zoom: {
              enabled: true,
              scaleExtent: [1, 10],
              useFixedDomain: false,
              useNiceScale: false,
              horizontalOff: false,
              verticalOff: true,
              unzoomEventType: 'dblclick.zoom'
            }
          }
        };

      }

    getTimeSeries() {
        this.stocks.getStockInfo(this.symbol).subscribe(res => {
            this.parseTimeSeries(res);
        });
    }

    parseTimeSeries(timeSeries: any) {

        let data = [{
            values: []
        }];

        for (const prop in timeSeries) {
            if (prop === 'Time Series (Daily)') {
                var serie = timeSeries[prop];
            }
        }

        if (serie) {
            for (const prop in serie) {
                let timestamp: number;
                timestamp = this.convertDateToTimestamp(prop);

                let dataSet;
                dataSet = {
                    time: this.convertDateToTimestamp(prop),
                    open: serie[prop]['1. open'],
                    high: serie[prop]['2. high'],
                    low: serie[prop]['3. low'],
                    close: serie[prop]['4. close'],
                    volume: serie[prop]['5. volume']
                };

                data[0]['values'].unshift(dataSet);
            }
            this.data = data;
            console.log(this.data);
            this.loaded = true;
        }
    }

    convertDateToTimestamp(fullDate: any) {
        // fullDate = fullDate.split(' ');
        let date = fullDate.split('-');
        let year = date[0];
        let month = date[1] - 1;
        let day = date[2];

        // let time = fullDate[1].split(':');
        // let hour = time[0];
        // let minute = time[1];
        // let second = time[2];

        console.log(new Date(year, month, day).getTime()/1000);

        return new Date(year, month, day).getTime()/1000;
    }

}
