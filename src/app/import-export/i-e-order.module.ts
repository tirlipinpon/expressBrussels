import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IEOrderRoutingModule } from './i-e-order-routing.module';
import { IEOrderComponent } from './i-e-order/i-e-order.component';

@NgModule({
  declarations: [IEOrderComponent],
  imports: [
    CommonModule,
    IEOrderRoutingModule
  ]
})
export class IEOrderModule { }
