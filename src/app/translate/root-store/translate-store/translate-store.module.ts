import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {orderTranslateReducer} from "./reducer";
import {OrderTranslateStoreEffects} from "./effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('order-translate', orderTranslateReducer),
    EffectsModule.forFeature([OrderTranslateStoreEffects])
  ],
  providers: [OrderTranslateStoreEffects]
})
export class TranslateStoreModule { }
