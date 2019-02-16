/**
 * Created by tirli on 16-02-19.
 */

import {initialState, OrderTranslateState, orderTranslateAdapter} from './state';
import {Actions, ActionTypes} from "./actions";

export function orderTranslateReducer(state = initialState, action: Actions): OrderTranslateState {
  switch (action.type) {
    case ActionTypes.ADD_SUCCESS: {
      return orderTranslateAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.READ_SUCCESS: {
      return orderTranslateAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.READ_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.UPDATE_SUCCESS: {
      return orderTranslateAdapter.updateOne({
          id: action.payload.id,
          changes: action.payload.changes
        },
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case ActionTypes.UPDATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
