import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportExportListComponent} from "./i-e-list/i-e-list.component";

const routes: Routes = [
  {
    path: 'admin/import-export',
    component: ImportExportListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportExportRoutingModule { }
