import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersListComponent} from "./orders-list/orders-list.component";

const routes: Routes = [
  {
    path: 'admin/orders',
    component: OrdersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
