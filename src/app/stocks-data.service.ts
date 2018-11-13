import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksDataService {

  apikey = 'GOWTX5JCY6GY5UAR';
  function = 'TIME_SERIES_DAILY';
  interval = '60min';

  constructor(private http: HttpClient) { }

  getStockInfo(symbol: string) {
    const url = 'https://www.alphavantage.co/query?'
      + 'function=' + this.function
      + '&symbol=' + symbol
      // + '&interval=' + this.interval
      + '&apikey=' + this.apikey;

    return this.http.get(url)
      .pipe(map(res => res));
  }

  checkIfSymbolExists(symbol: string) {
    const url = 'https://www.alphavantage.co/query?'
      + 'function=' + this.function
      + '&symbol=' + symbol
      + '&interval=' + this.interval
      + '&apikey=' + this.apikey;

    return this.http.get(url)
      .pipe(
        map(res => (!res['Error Message']))
      );
  }

}
