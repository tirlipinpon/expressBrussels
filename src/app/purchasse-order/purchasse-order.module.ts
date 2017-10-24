import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule} from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {customerReducer, removalReducer, recipientReducer} from "../reducers/purchasseOrder.reducer";
import { PurchasseOrderComponent } from './purchasse-order.component';
import {FormComponent} from "../shared/forms/form/form.component";
import {DropDownDirective} from "../shared/directives/drop-down.directive";
import {SearchFilterPipe} from "../shared/pipe/search-filter.pipe";
import {ServiceService} from "../servicse/service.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      ServiceService
    ]),
    StoreModule.forRoot({
      customerReducer: customerReducer,
      removalReducer: removalReducer,
      recipientReducer: recipientReducer
    })
  ],
  exports: [
    PurchasseOrderComponent
  ],
  declarations: [
    PurchasseOrderComponent,
    FormComponent,
    DropDownDirective,
    SearchFilterPipe
  ],
  providers: [],
})
export class PurchasseModule { }
