import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {ImportExportReducer} from "./reducer";
import {ImportExportStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ImportExportReducer', ImportExportReducer),
    EffectsModule.forFeature([ImportExportStoreEffects])
  ],
  providers: [ImportExportStoreEffects]
})
export class IEStoreModule { }
