/**
 * Created by tirli on 13-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {PurchasseOrder} from "../../../models/PurchasseOrder";


export const ordersAdapter: EntityAdapter<PurchasseOrder> = createEntityAdapter<PurchasseOrder>({
  selectId: model => model.id,
  sortComparer: (a: PurchasseOrder, b: PurchasseOrder): number =>
    b.created.toString().localeCompare(a.created.toString())
});

export interface OrdersState extends EntityState<PurchasseOrder> {
  isLoading?: boolean;
  error?: any;
}

export const initalOrdersState: OrdersState = ordersAdapter.getInitialState({
  isLoading: false,
  error: null
});
