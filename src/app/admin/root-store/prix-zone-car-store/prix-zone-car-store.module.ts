import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { prixZonesCarReducer} from "./reducer";
import {PrixZonesCarStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-prix-zones-car', prixZonesCarReducer),
    EffectsModule.forFeature([PrixZonesCarStoreEffects])
  ],
  providers: [PrixZonesCarStoreEffects]
})
export class PrixZonesCarStoreModule { }
