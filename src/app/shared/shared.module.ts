import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {NotificationComponent} from "./components/notification/notification.component";
import {GrowlModule} from "primeng/components/growl/growl";
import {SearchFilterPipe} from "./pipe/search-filter.pipe";
import {OptionComponent} from "./components/form/option/option.component";
import {InfoComponent} from "./components/form/info/info.component";
import {OnBlurDirective} from "./directives/on-blur.directive";
import {DropDownDirective} from "./directives/drop-down.directive";
import {FormComponent} from "./components/form/form.component";
import { ProfileComponent } from './components/profile/profile.component';
import {DialogModule} from "primeng/components/dialog/dialog";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    CommonModule,
    GrowlModule,
    DialogModule
  ],
  exports: [
    GrowlModule,
    NotificationComponent,
    FormComponent,
    OptionComponent,
    ProfileComponent
  ],
  declarations: [
    NotificationComponent,

    FormComponent,
    DropDownDirective,
    OnBlurDirective,
    InfoComponent,
    OptionComponent,
    SearchFilterPipe,
    ProfileComponent,

  ],
  providers: []
})
export class SharedModule {}
