import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {NotificationComponent} from "./components/notification/notification.component";
import {GrowlModule} from "primeng/components/growl/growl";
import {SearchFilterPipe} from "./pipe/search-filter.pipe";
import {OptionComponent} from "./components/form/option/option.component";
import {InfoComponent} from "./components/form/info/info.component";
import {OnBlurDirective} from "./directives/on-blur.directive";
import {DropDownDirective} from "./directives/drop-down.directive";
import {FormComponent} from "./components/form/form.component";
import { ProfileComponent } from './components/profile/profile.component';
import {DialogModule} from "primeng/components/dialog/dialog";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {ConfirmationService} from "primeng/components/common/confirmationservice";
import {
  removalReducer, customerReducer, recipientReducer, purchasseOrderReducer,
  ordersReducer
} from "../reducers/all.reducer";
import {StoreModule} from "@ngrx/store";
import {OrdersEffectService} from "../effects/orders/orders-effect.service";
import {PurchasseOrderEffectService} from "../effects/order/purchasse-order-effect.service";
import {RemovalEffectService} from "../effects/removals/removal-effect.service";
import {CustomerEffectService} from "../effects/customer/customer-effect.service";
import {RecipientEffectService} from "../effects/recipients/recipient-effect.service";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    CommonModule,
    GrowlModule,
    DialogModule,
    ConfirmDialogModule,

    EffectsModule.forRoot([
      RecipientEffectService,
      CustomerEffectService,
      RemovalEffectService,
      PurchasseOrderEffectService,
      OrdersEffectService
    ]),
    // StoreModule.forFeature('todo', customerReducer)
    StoreModule.forRoot({
      customer: customerReducer,
      removals: removalReducer,
      recipients: recipientReducer,
      order: purchasseOrderReducer,
      orders: ordersReducer
    }),
  ],
  exports: [
    GrowlModule,
    NotificationComponent,
    FormComponent,
    OptionComponent,
    ProfileComponent,
    ConfirmDialogModule
  ],
  declarations: [
    NotificationComponent,

    FormComponent,
    DropDownDirective,
    OnBlurDirective,
    InfoComponent,
    OptionComponent,
    SearchFilterPipe,
    ProfileComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule {}
