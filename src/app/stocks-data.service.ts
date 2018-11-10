import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksDataService {

  apikey = 'GOWTX5JCY6GY5UAR';
  function = 'TIME_SERIES_INTRADAY';
  symbol: string;
  interval = '5min';

  constructor(private http: HttpClient) { }

  checkIfSymbolExists(symbol: string) {
    this.symbol = symbol;
    const url = 'https://www.alphavantage.co/query?function='
      + this.function
      + '&symbol=' + this.symbol
      + '&interval=' + this.interval
      + '&apikey=' + this.apikey;

    this.symbol = symbol;
    return this.http.get(url)
      .pipe(
        map(res => (!res['Error Message']))
      );
  }

}
