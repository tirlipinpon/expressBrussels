import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {PurchasseOrderComponent} from "../purchasse-order/purchasse-order.component";

export class UnsearchedTermGuard implements CanDeactivate<PurchasseOrderComponent> {
  canDeactivate(component: PurchasseOrderComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log("UnsearchedTermGuard");
    console.log("route.params: ", route.params);
    console.log("state.url: "+state.url);

    if(component.canDeactivate()){
      return true;
    }else{
      if (window.confirm('If you leave you will lose everything !'))
      {
        component.resetOrder();
        return true;
      }
      else
      {
        return false;
      }
    }


  }
}
