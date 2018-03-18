import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {PurchasseModule} from './purchasse-order/purchasse-order.module';
import {Routes, RouterModule} from '@angular/router';
import {PurchasseOrderComponent} from './purchasse-order/purchasse-order.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { SortByValuePipe } from './shared/pipe/sort-by-value.pipe';
import { RecipientsComponent } from './recipients-edit/recipients/recipients.component';
import { RemovalsComponent } from './removals-edit/removals/removals.component';
import { AlwaysAuthGuardService } from './services/always-auth-guard.service';
import { UnsearchedTermGuard } from './services/UnseavedTermGuard';
import {CustomerService} from './services/customer.service';
import {OrderService} from './services/order.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng/components/common/messageservice';
import {NotificationService} from './services/notification.service';
import { CommonModule } from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {RecipientsEditModule} from './recipients-edit/recipients-edit.module';
import {RemovalsEditModule} from './removals-edit/removals-edit.module';
import {RemovalService} from './services/removal.service';
import { OrdersComponent } from './orders/orders.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule, MatSortModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {CanDeactivateFormGuardService} from './services/can-deactivate-form-guard.service';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import { MenuComponent } from './menu/menu.component';
import {ClientZonesEffectService} from './effects/client-zones/client-zones-effect.service';
import {ClientZonesService} from './services/client-zones.service';
import { CascadeComponent } from './cascade/cascade.component';
import {CascadeModule} from './cascade/cascade.module';
import { AgmCoreModule } from '@agm/core';
import {GetDistanceMatrixService} from "./services/google/get-distance-matrix.service";

const appRoutes: Routes = [
  { path: 'login',                component: LoginComponent },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AlwaysAuthGuardService],
    children: [
      {
        path: '',
        component: PurchasseOrderComponent
      },
      {
        path: 'order',
        component: PurchasseOrderComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'removals',
        component: RemovalsComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'recipients',
        component: RecipientsComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'cascade',
        component: CascadeComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
    ]
  },
  // otherwise redirect to home
  { path: '**',                   redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    SortByValuePipe,
    OrdersComponent,
    LoginComponent,
    MenuComponent
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
    CascadeModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdhzqNNDkWkbpqgajvi_66wx1dLoGoac0',
      libraries: ["places"]
    }),

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
    CanDeactivateFormGuardService,
    AuthenticationService,
    ClientZonesService,
    GetDistanceMatrixService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
