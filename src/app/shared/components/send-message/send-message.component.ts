import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as fromRoot from '../../appState';
import * as CustomerActions from '../../../actions/customer.actions';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  display: boolean = false;
  formMessage: FormGroup;

  constructor(private store: Store<fromRoot.AppState>,
              private fb: FormBuilder,
              private notificationsService: NotificationService) {
    this.initFormsMessage();
  }

  ngOnInit() {
  }

  showDialog() {
    this.display = true;
  }


  initFormsMessage(): void {
    this.formMessage = this.fb.group({
      message: ['', Validators.required]
    });
  }

  sendMessage(): void {
    // console.log('on customer value  changed: ', data);
    this.store.dispatch(new CustomerActions.SendCustomerMessage(this.formMessage.value));
    this.notificationsService.notify('success', 'Merci, votre Message a bien été envoyé.', 'Message: ['
      + this.formMessage.get('message').value
      + '] , nous vous contacterons dans les plus brefs délais.');
    // this.cdr.markForCheck();
    this.formMessage.reset();
  }

}
