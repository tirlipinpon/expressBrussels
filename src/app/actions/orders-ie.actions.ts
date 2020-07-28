/**
 * Created by tirli on 18-02-19.
 */
import { Action } from '@ngrx/store';
import { ImportExport } from '../models/import-export';

export enum ActionTypes {
  GET_REQUEST = '[Import/Export] Get Request',
  GET_SUCCESS = '[Import/Export] Get Success',
  GET_FAILURE = '[Import/Export] Get Fail'
}

export class GetRequestAction implements Action {
  readonly type = ActionTypes.GET_REQUEST;
  constructor(public payload: number) {
    // console.log('in actions get orders by fk_customer_id payload=',payload);
  }
}

export class GetSuccessAction implements Action {
  readonly type = ActionTypes.GET_SUCCESS;
  constructor(public payload: ImportExport[]) { }
}

export class GetFailureAction implements Action {
  readonly type = ActionTypes.GET_FAILURE;
  constructor(public payload: string) { }
}

export type All =  GetRequestAction | GetFailureAction | GetSuccessAction;
