import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RemovalsComponent} from './removals/removals.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RemovalsComponent
  ]
})
export class RemovalsEditModule {
}
