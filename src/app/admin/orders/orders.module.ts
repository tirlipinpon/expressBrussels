import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatSelectModule, MatInputModule} from "@angular/material";

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class OrdersModule { }
