import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchasseOrderComponent } from './purchasse-order.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatTooltipModule
  ],
  exports: [
  ],
  declarations: [
    PurchasseOrderComponent
  ],
  providers: []
})
export class PurchasseModule { }
