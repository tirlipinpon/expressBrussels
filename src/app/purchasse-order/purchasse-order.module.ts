import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule} from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {customerReducer, removalReducer, recipientReducer} from "../reducers/all.reducer";

import { PurchasseOrderComponent } from './purchasse-order.component';
import {FormComponent} from "../shared/forms/form/form.component";
import {DropDownDirective} from "../shared/directives/drop-down.directive";
import {SearchFilterPipe} from "../shared/pipe/search-filter.pipe";
import {CustomerService} from "../services/customer.service";
import {CustomerEffectService} from "../effects/customer/customer-effect.service";
import {RemovalEffectService} from "../effects/removals/removal-effect.service";
import {RemovalService} from "../services/removal.service";
import {RecipientEffectService} from "../effects/recipients/recipient-effect.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([
      CustomerService,
      RemovalService,
      RecipientEffectService,
      CustomerEffectService,
      RemovalEffectService
    ]),
    StoreModule.forRoot({
      customer: customerReducer,
      removals: removalReducer,
      recipients: recipientReducer
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
