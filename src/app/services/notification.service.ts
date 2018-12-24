import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from 'primeng/components/common/message';
type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}
  notificationChange: Subject<Message> = new Subject<Message>();

  notify(severity: Severities, summary: string, detail: string) {
    this.notificationChange.next({ severity, summary, detail});
  }

}
