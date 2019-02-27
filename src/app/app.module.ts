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
import { CommonModule } from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {RemovalsEditModule} from './removals-edit/removals-edit.module';
import {RemovalService} from './services/removal.service';
import { OrdersComponent } from './orders/orders.component';
import {MatTableModule} from '@angular/material/table';
import {
  MatFormFieldModule, MatSortModule, MatPaginatorModule, MatInputModule, MatMenuModule,
  MatButtonModule, MatRadioModule, MatSelectModule, MatTooltipModule
} from '@angular/material';
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
import {reducers} from "./shared/appState";
import {StoreModule} from "@ngrx/store";
import { RootStoreModule } from './admin/root-store/root-store.module';
import {AdminAlwaysAuthGuardService} from "./services/admin-always-auth-guard.service";
import {ClientsModule} from "./admin/clients/clients.module";
import {OrdersModule} from "./admin/orders/orders.module";
import {TranslateModule} from "./admin/translate/translate.module";
import {TranslateOrderModule} from "./translate/translate.module";
import {ImportExportModule} from "./admin/i-e/i-e.module";


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    // canActivate: [AlwaysAuthGuardService],
    children: [
      {
        path: '',
        component: PurchasseOrderComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService],
        resolve: { id: RouteResolverService }
      },
      {
        path: 'order',
        component: PurchasseOrderComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService],
        resolve: { id: RouteResolverService }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'removals',
        component: RemovalsComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'recipients',
        component: RemovalsComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'cascade',
        component: CascadeComponent,
        // canActivate: [AlwaysAuthGuardService],
        canDeactivate: [CanDeactivateFormGuardService]
      },
      {
        path: 'translate-order',
        loadChildren: './translate/translate.module#TranslateOrderModule'
      },
      {
        path: 'import-export-order',
        loadChildren: './import-export/i-e-order.module#IEOrderModule',
        // canActivate: [AlwaysAuthGuardService],
      }
    ]
  },
  {
    path: 'admin/clients',
    canActivate: [AdminAlwaysAuthGuardService],
    loadChildren: './admin/clients/clients.module#ClientsModule'
  },
  {
    path: 'admin/orders',
    canActivate: [AdminAlwaysAuthGuardService],
    loadChildren: './admin/orders/orders.module#OrdersModule'
  },
  {
    path: 'admin/translate',
    canActivate: [AdminAlwaysAuthGuardService],
    loadChildren: './admin/translate/translate.module#TranslateModule'
  },
  {
    path: 'admin/import-export',
    canActivate: [AdminAlwaysAuthGuardService],
    loadChildren: './admin/i-e/i-e.module#ImportExportModule'
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
    ClientsModule,
    OrdersModule,
    TranslateModule,
    ImportExportModule,

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
    MatTooltipModule,
    StoreModule.forRoot(reducers),

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
    }),
    RootStoreModule, // admin store

  ],
  providers: [
    CustomerService,
    OrderService,
    RemovalService,
    AlwaysAuthGuardService,
    UnsearchedTermGuard,
    MessageService,
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
