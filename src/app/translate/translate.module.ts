import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { OrderComponent } from './translate-order/order.component';
import {
  MatStepperModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatCardModule,
  MatButtonModule
} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {TranslateStoreModule} from "./root-store/translate-store/translate-store.module";
import {RootStoreModule} from "./root-store/root-store.module";

@NgModule({
  declarations: [OrderComponent],
  imports: [
    SharedModule,
    CommonModule,
    TranslateRoutingModule,
    TranslateStoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    RootStoreModule
  ]
})
export class TranslateOrderModule { }
