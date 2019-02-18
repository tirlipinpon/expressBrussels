import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IEOrderComponent} from "./i-e-order/i-e-order.component";

const routes: Routes = [{
    path: '',
    component: IEOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IEOrderRoutingModule { }
