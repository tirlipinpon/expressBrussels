import { Component, OnInit, ViewEncapsulation, OnDestroy  } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Message} from "primeng/components/common/message";
import {NotificationService} from "../../../services/notification.service";
import {MessageService} from "primeng/components/common/messageservice";


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificationsService: NotificationService, private messageService: MessageService) { }

  ngOnInit() {
    this.subscribeToNotifications();
  }
  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange
      .subscribe(notification => {
        console.log('notification:', notification);
        // this.msgs.length = 0;
        this.messageService.add(notification);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
