/**
 * Created by tirli on 13-02-19.
 */
import {Actions, OrdersActionTypes} from "./actions";
import {initalOrdersState, OrdersState, ordersAdapter} from "./state";

export function ordersReducer(state = initalOrdersState, action: Actions): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.LOAD_SUCCESS: {
      return ordersAdapter.addAll(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case OrdersActionTypes.LOAD_FAILURE: {
      return ordersAdapter.removeAll(
        state
      );
    }
    case OrdersActionTypes.SET_FAILURE: {
      return  {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case OrdersActionTypes.UPDATE_SUCCESS: {
      return ordersAdapter.updateOne({
          id: action.payload.item.id,
          changes: action.payload.item
        },
        {
          ...state,
          isLoading: false,
          error: null
        }

      )
    }
    default: {
      return state;
    }
  }
}
