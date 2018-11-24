import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {PurchasseModule} from './purchasse-order/purchasse-order.module';
import {Routes, RouterModule} from '@angular/router';
import {PurchasseOrderComponent} from './purchasse-order/purchasse-order.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { SortByValuePipe } from './shared/pipe/sort-by-value.pipe';
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
import {RemovalsEditModule} from './removals-edit/removals-edit.module';
import {RemovalService} from './services/removal.service';
import { OrdersComponent } from './orders/orders.component';
import {MatTableModule} from '@angular/material/table';
import {
  MatFormFieldModule, MatSortModule, MatPaginatorModule, MatInputModule, MatMenuModule,
  MatButtonModule, MatRadioModule, MatSelectModule
} from '@angular/material'; // TODO: import refrences
import {CanDeactivateFormGuardService} from './services/can-deactivate-form-guard.service';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import { MenuComponent } from './menu/menu.component';
import {ClientZonesService} from './services/client-zones.service';
import { CascadeComponent } from './cascade/cascade.component';
import {CascadeModule} from './cascade/cascade.module';
import { AgmCoreModule } from '@agm/core';
import {GetDistanceMatrixService} from "./services/google/get-distance-matrix.service";
import {RouteResolverService} from "./services/route-resolver.service";
import {GetPrixZoneService} from "./services/get-prix-zone.service";
import { ContactService } from './services/contact.service';
import {NumberTransformToMonthPipe} from "./shared/pipe/number-transform-to-month.pipe";



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
        component: PurchasseOrderComponent,
        canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService],
        resolve: { id: RouteResolverService }
      },
      {
        path: 'order',
        component: PurchasseOrderComponent,
        // canActivate: [AlwaysAuthGuardService],
        // canDeactivate: [CanDeactivateFormGuardService],
        resolve: { id: RouteResolverService }
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
        component: RemovalsComponent,
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
  // { path: '**',  redirectTo: ''}
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
    MatMenuModule,

    PurchasseModule,
    RemovalsEditModule,
    SharedModule,
    CascadeModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdhzqNNDkWkbpqgajvi_66wx1dLoGoac0&language=fr&region=BE',
      libraries: ["places"],
      language: 'fr'
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
    GetDistanceMatrixService,
    RouteResolverService,
    GetPrixZoneService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
