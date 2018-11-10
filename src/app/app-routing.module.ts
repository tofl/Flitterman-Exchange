import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components import
import { HomeComponent } from './home/home.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stocks/:symbol', component: StockDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
