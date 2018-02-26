import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipientsComponent} from './recipients/recipients.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
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
    RecipientsComponent
  ]
})
export class RecipientsEditModule { }
