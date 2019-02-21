import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {translatesReducer} from "./reducer";
import {TranslatesStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('admin-translates', translatesReducer),
    EffectsModule.forFeature([TranslatesStoreEffects])
  ],
  providers: [TranslatesStoreEffects]
})
export class TranslatesStoreModule { }
