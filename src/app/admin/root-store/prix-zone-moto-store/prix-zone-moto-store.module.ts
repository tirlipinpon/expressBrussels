import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { prixZonesMotoReducer} from "./reducer";
import {PrixZonesMotoStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-prix-zones-moto', prixZonesMotoReducer),
    EffectsModule.forFeature([PrixZonesMotoStoreEffects])
  ],
  providers: [PrixZonesMotoStoreEffects]
})
export class PrixZonesMotoStoreModule { }
