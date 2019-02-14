import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ordersReducer} from "./reducer";
import {OrdersStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-orders', ordersReducer),
    EffectsModule.forFeature([OrdersStoreEffects])
  ],
  providers: [OrdersStoreEffects]
})
export class OrdersStoreModule { }
