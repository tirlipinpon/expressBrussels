import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Message} from 'primeng/components/common/message';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable()
export class NotificationService {

  notificationChange: Subject<Message> = new Subject<Message>();

  notify(severity: Severities, summary: string, detail: string) {
    // console.log('NotificationService notify= severity: ',severity , ' summary: ', summary, ' detail: ', detail )
    this.notificationChange.next({ severity, summary, detail});
  }

}
