/**
 * Created by tirli on 16-02-19.
 */
import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.ADD_SUCCESS: {
      return featureAdapter.add(action.payload.item, {
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
      return featureAdapter.addAll(action.payload.items, {
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
      return featureAdapter.updateOne({
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
