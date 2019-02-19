/**
 * Created by tirli on 13-02-19.
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {OrderTranslate} from "../../../models/translate";


export const translatesAdapter: EntityAdapter<OrderTranslate> = createEntityAdapter<OrderTranslate>({
  selectId: model => model.id,
  sortComparer: (a: OrderTranslate, b: OrderTranslate): number =>
    b.created.toString().localeCompare(a.created.toString())
});

export interface TranslatesState extends EntityState<OrderTranslate> {
  isLoading?: boolean;
  error?: any;
}

export const initalTranslatesState: TranslatesState = translatesAdapter.getInitialState({
  isLoading: false,
  error: null
});
