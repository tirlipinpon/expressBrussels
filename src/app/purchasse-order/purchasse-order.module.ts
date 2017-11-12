import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule} from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {customerReducer, removalReducer, recipientReducer, purchasseOrderReducer} from "../reducers/all.reducer";

import { PurchasseOrderComponent } from './purchasse-order.component';
import {FormComponent} from "../shared/components/form/form.component";
import {DropDownDirective} from "../shared/directives/drop-down.directive";
import {SearchFilterPipe} from "../shared/pipe/search-filter.pipe";
import {CustomerService} from "../services/customer.service";
import {CustomerEffectService} from "../effects/customer/customer-effect.service";
import {RemovalEffectService} from "../effects/removals/removal-effect.service";
import {RemovalService} from "../services/removal.service";
import {RecipientEffectService} from "../effects/recipients/recipient-effect.service";
import {OrderService} from "../services/order.service";
import {PurchasseOrderEffectService} from "../effects/order/purchasse-order-effect.service";
import {RecipientsComponent} from "../recipients-edit/recipients/recipients.component";
import {RemovalsComponent} from "../removals-edit/removals/removals.component";
import {OptionComponent} from "../shared/components/form/option/option.component";
import {InfoComponent} from "../shared/components/form/info/info.component";
import {OnBlurDirective} from "../shared/directives/on-blur.directive";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,

    SharedModule,
    EffectsModule.forRoot([
      CustomerService,
      RemovalService,
      OrderService,
      RecipientEffectService,
      CustomerEffectService,
      RemovalEffectService,
      PurchasseOrderEffectService
    ]),
    // StoreModule.forFeature('todo', customerReducer)
    StoreModule.forRoot({
      customer: customerReducer,
      removals: removalReducer,
      recipients: recipientReducer,
      order: purchasseOrderReducer
    })
  ],
  exports: [

  ],
  declarations: [
    PurchasseOrderComponent,
    RecipientsComponent,
    RemovalsComponent,

  ],
  providers: [],
})
export class PurchasseModule { }
