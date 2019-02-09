import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsStoreModule } from './clients-store/clients-store.module';
import {PrixZonesMotoStoreModule} from "./prix-zone-moto-store/prix-zone-moto-store.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsStoreModule,
    PrixZonesMotoStoreModule
  ]
})

export class RootStoreModule { }
