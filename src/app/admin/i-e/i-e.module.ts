import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatSelectModule, MatInputModule, MatCheckboxModule} from "@angular/material";
import {SharedModule} from "../../shared/shared.module";

import { ImportExportRoutingModule } from './i-e-routing.module';
import { ImportExportListComponent } from './i-e-list/i-e-list.component';

@NgModule({
  declarations: [
    ImportExportListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImportExportRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class ImportExportModule { }
