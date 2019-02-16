import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { OrderComponent } from './translate-order/order.component';
import {
  MatStepperModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatCardModule,
  MatButtonModule
} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TranslateModule { }
