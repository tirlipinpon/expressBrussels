import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipientsComponent} from './recipients/recipients.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RecipientsComponent
  ]
})
export class RecipientsEditModule { }
