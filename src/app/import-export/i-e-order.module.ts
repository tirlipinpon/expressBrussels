import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IEOrderRoutingModule } from './i-e-order-routing.module';
import { IEOrderComponent } from './i-e-order/i-e-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule, MatStepperModule, MatSelectModule, MatCardModule, MatCheckboxModule} from "@angular/material";
import {RootStoreModule} from "./root-store/root-store.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [IEOrderComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IEOrderRoutingModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    RootStoreModule
  ]
})
export class IEOrderModule { }
