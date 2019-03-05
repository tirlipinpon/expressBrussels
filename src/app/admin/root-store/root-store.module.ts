import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsStoreModule } from './clients-store/clients-store.module';
import { PrixZonesMotoStoreModule } from "./prix-zone-moto-store/prix-zone-moto-store.module";
import { PrixZonesCarStoreModule } from "./prix-zone-car-store/prix-zone-car-store.module";
import {OrdersStoreModule} from "./orders-store/orders-store.module";
import {TranslatesStoreModule} from "./translates-store/translate-store.module";
import {ImportExportStoreModule} from "./i-e-store/i-e-store.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsStoreModule,
    PrixZonesMotoStoreModule,
    PrixZonesCarStoreModule,
    OrdersStoreModule,
    TranslatesStoreModule,
    ImportExportStoreModule
  ]
})

export class RootStoreModule { }
