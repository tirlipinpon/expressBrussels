import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {Observer, Observable} from "rxjs";
import {ConfirmationService} from "primeng/components/common/confirmationservice";

export interface ComponentDeactivable {
  canDeactivate: () => boolean;
}

@Injectable()
export class CanDeactivateFormGuardService implements CanDeactivate<ComponentDeactivable> {

  constructor(private confirmationService: ConfirmationService) { }

  canDeactivate(component: ComponentDeactivable): boolean {
    return component.canDeactivate ? this.actionConfirm(component) : true;
  }

  actionConfirm(component): boolean {
    if(component.canDeactivate()) {
      console.log('component.canDeactivate() 1', component.canDeactivate());
      return true;
    }else{
      console.log('component.canDeactivate() 2 ', component.canDeactivate());

      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
          message: 'You have unsaved changes. Are you sure you want to leave this page?',
          accept: () => {
            // component.resetOrder();
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          }
        });
      });

      // if (window.confirm('If you leave you will lose everything !'))
      // {
      //   component.resetOrder();
      //   return true;
      // }
      // else
      // {
      //   return false;
      // }
    }

  }

}
