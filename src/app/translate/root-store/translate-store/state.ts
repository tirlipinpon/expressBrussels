/**
 * Created by tirli on 16-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {OrderTranslate} from "../../../models/translate";


export const orderTranslateAdapter: EntityAdapter<OrderTranslate> = createEntityAdapter<OrderTranslate>({
  selectId: model => model.id,
  sortComparer: (a: OrderTranslate, b: OrderTranslate): number =>
    b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<OrderTranslate> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = orderTranslateAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
