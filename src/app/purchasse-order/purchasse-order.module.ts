import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchasseOrderComponent } from './purchasse-order.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule, MatCardModule} from "@angular/material";
import {StoreModule} from "@ngrx/store";
import {purchasseOrderReducer} from "../reducers/all.reducer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatTooltipModule,
    MatCardModule,
    StoreModule.forFeature('order', purchasseOrderReducer)
  ],
  exports: [
  ],
  declarations: [
    PurchasseOrderComponent
  ],
  providers: []
})
export class PurchasseModule { }
