import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IEOrderRoutingModule } from './i-e-order-routing.module';
import { IEOrderComponent } from './i-e-order/i-e-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";
import {RootStoreModule} from "./root-store/root-store.module";

@NgModule({
  declarations: [IEOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IEOrderRoutingModule,
    MatInputModule,
    RootStoreModule
  ]
})
export class IEOrderModule { }
