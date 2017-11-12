import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./components/notification/notification.component";
import {GrowlModule} from "primeng/components/growl/growl";

@NgModule({
  imports: [CommonModule, GrowlModule],
  exports: [ GrowlModule,NotificationComponent],
  declarations: [NotificationComponent],
  providers: []
})
export class SharedModule {}
