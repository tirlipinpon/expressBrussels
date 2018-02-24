import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PurchasseOrderComponent} from '../purchasse-order/purchasse-order.component';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import { Observer, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class UnsearchedTermGuard implements CanDeactivate<PurchasseOrderComponent> {

  constructor(private confirmationService: ConfirmationService) {}

  canDeactivate(component: PurchasseOrderComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot,
  ): boolean {
    // console.log('UnsearchedTermGuard');
    // console.log('route.params: ', route.params);
    // console.log('state.url: '+state.url);

    if(component.canDeactivate()) {
      console.log('component.canDeactivate() 1', component.canDeactivate());
      return true;
    }else{
      // console.log('component.canDeactivate() 2 ', component.canDeactivate());
      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
          message: 'You have unsaved changes. Are you sure you want to leave this page?',
          accept: () => {
            component.resetOrder();
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
