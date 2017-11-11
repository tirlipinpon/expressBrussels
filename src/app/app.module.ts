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
import {GrowlModule} from "primeng/components/growl/growl";
import {MessageService} from "primeng/components/common/messageservice";
import { NotificationComponent } from './shared/components/notification/notification.component';
import {NotificationService} from "./services/notification.service";

import { CommonModule } from '@angular/common';
import {SharedModule} from "./shared/shared.module";



const appRoutes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full'},
  { path: 'order',                component: PurchasseOrderComponent,canActivate: [AlwaysAuthGuardService], canDeactivate: [UnsearchedTermGuard] },
  { path: 'removals',             component: RemovalsComponent, canActivate: [AlwaysAuthGuardService],},
  { path: 'recipients',           component: RecipientsComponent, canActivate: [AlwaysAuthGuardService],},
  { path: '**',                    component: PurchasseOrderComponent, canActivate: [AlwaysAuthGuardService],}
];

@NgModule({
  declarations: [
    AppComponent,
    SortByValuePipe
  ],
  exports: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PurchasseModule,
    SharedModule,
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
      // { enableTracing: true } // <-- debugging purposes only
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })

  ],
  providers: [
    CustomerService,
    OrderService,
    AlwaysAuthGuardService,
    UnsearchedTermGuard,
    MessageService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
