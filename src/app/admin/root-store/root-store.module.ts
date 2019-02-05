import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsStoreModule } from './clients-store/clients-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsStoreModule
  ]
})
export class RootStoreModule { }
