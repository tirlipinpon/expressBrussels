import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsStoreModule } from './clients-store/clients-store.module';
import { PrixZonesMotoStoreModule } from "./prix-zone-moto-store/prix-zone-moto-store.module";
import { PrixZonesCarStoreModule } from "./prix-zone-car-store/prix-zone-car-store.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsStoreModule,
    PrixZonesMotoStoreModule,
    PrixZonesCarStoreModule
  ]
})

export class RootStoreModule { }
