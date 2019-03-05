import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {importExportReducer} from "./reducer";
import {ImportExportStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-import-export', importExportReducer),
    EffectsModule.forFeature([ImportExportStoreEffects])
  ],
  providers: [ImportExportStoreEffects]
})
export class ImportExportStoreModule { }
