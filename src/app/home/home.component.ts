import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StocksDataService } from '../stocks-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;
  symbolExists = true;
  symbolSearch: string;

  constructor(private formBuilder: FormBuilder, private stocks: StocksDataService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      symbol: ['', Validators.required]
    });
  }

  onSubmit(searchValue: string) {
    if (searchValue === '') { return; }
    this.submitted = true;
    this.stocks.checkIfSymbolExists(searchValue)
      .subscribe(res => {
        this.submitted = false;
        this.symbolSearch = searchValue;
        this.symbolExists = res;
        if (this.symbolExists) {
          window.location.href = 'http://ww.google.com';
        }
      });
  }

}
