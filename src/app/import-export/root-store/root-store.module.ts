import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEStoreModule } from './i-e-store/i-e-store.module';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IEStoreModule
  ]
})
export class RootStoreModule { }
