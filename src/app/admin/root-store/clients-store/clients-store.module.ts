import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {clientsReducer} from "./reducer";
import {ClientsStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-clients', clientsReducer),
    EffectsModule.forFeature([ClientsStoreEffects])
  ],
  providers: [ClientsStoreEffects]
})
export class ClientsStoreModule { }
