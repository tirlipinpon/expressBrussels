import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateListComponent } from './translate-list/translate-list.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatSelectModule, MatInputModule, MatCheckboxModule} from "@angular/material";
import {GetNameByIdPipe} from "../pipe/get-name-by-id.pipe";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    TranslateListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class TranslateModule { }
