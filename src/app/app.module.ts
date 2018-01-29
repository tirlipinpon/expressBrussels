import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {PurchasseModule} from "./purchasse-order/purchasse-order.module";
import {Routes, RouterModule} from "@angular/router";
import {PurchasseOrderComponent} from "./purchasse-order/purchasse-order.component";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { SortByValuePipe } from './shared/pipe/sort-by-value.pipe';
import { RecipientsComponent } from './recipients-edit/recipients/recipients.component';
import { RemovalsComponent } from './removals-edit/removals/removals.component';
import { AlwaysAuthGuardService } from "./services/always-auth-guard.service";
import { UnsearchedTermGuard } from "./shared/UnseavedTermGuard";
import { OnBlurDirective } from './shared/directives/on-blur.directive';
import {CustomerService} from "./services/customer.service";
import {OrderService} from "./services/order.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/components/common/messageservice";
import {NotificationService} from "./services/notification.service";
import { CommonModule } from '@angular/common';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {RecipientsEditModule} from "./recipients-edit/recipients-edit.module";
import {RemovalsEditModule} from "./removals-edit/removals-edit.module";
import {StoreModule} from "@ngrx/store";
import {CustomerEffectService} from "./effects/customer/customer-effect.service";
import {EffectsModule} from "@ngrx/effects";
import {PurchasseOrderEffectService} from "./effects/order/purchasse-order-effect.service";
import {RemovalEffectService} from "./effects/removals/removal-effect.service";
import {RemovalService} from "./services/removal.service";
import {RecipientEffectService} from "./effects/recipients/recipient-effect.service";

import {customerReducer, removalReducer, recipientReducer, purchasseOrderReducer, ordersReducer} from "./reducers/all.reducer";
import { OrdersComponent } from './orders/orders.component';
import {OrdersEffectService} from "./effects/orders/orders-effect.service";

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule, MatSortModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {CanDeactivateFormGuardService} from "./services/can-deactivate-form-guard.service";

const appRoutes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full'},
  { path: 'order',                component: PurchasseOrderComponent,canActivate: [AlwaysAuthGuardService], canDeactivate: [CanDeactivateFormGuardService] },
  { path: 'orders',               component: OrdersComponent,canActivate: [AlwaysAuthGuardService], canDeactivate: [CanDeactivateFormGuardService] },
  { path: 'removals',             component: RemovalsComponent, canActivate: [AlwaysAuthGuardService],},
  { path: 'recipients',           component: RecipientsComponent, canActivate: [AlwaysAuthGuardService],},
  { path: '**',                   component: PurchasseOrderComponent, canActivate: [AlwaysAuthGuardService],}
];

@NgModule({
  declarations: [
    AppComponent,
    SortByValuePipe,
    OrdersComponent
  ],
  exports: [ AppComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,

    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,

    PurchasseModule,
    RecipientsEditModule,
    RemovalsEditModule,
    SharedModule,

    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
      // { enableTracing: true } // <-- debugging purposes only
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    })

  ],
  providers: [
    CustomerService,
    OrderService,
    RemovalService,
    AlwaysAuthGuardService,
    UnsearchedTermGuard,
    MessageService,
    NotificationService,
    CanDeactivateFormGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
