import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateListComponent} from "./translate-list/translate-list.component";

const routes: Routes = [
  {
    path: 'admin/translate',
    component: TranslateListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule { }
