import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RemovalsComponent} from './removals/removals.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    RemovalsComponent
  ]
})
export class RemovalsEditModule {
}
