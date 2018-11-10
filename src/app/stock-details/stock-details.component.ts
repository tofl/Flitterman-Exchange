import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  symbol: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.symbol = this.activatedRoute.snapshot.paramMap.get('symbol');
  }

}
