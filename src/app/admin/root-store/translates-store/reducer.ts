/**
 * Created by tirli on 13-02-19.
 */
import {Actions, TranslatesActionTypes} from "./actions";
import {initalTranslatesState, TranslatesState, translatesAdapter} from "./state";

export function translatesReducer(state = initalTranslatesState, action: Actions): TranslatesState {
  switch (action.type) {
    case TranslatesActionTypes.LOAD_SUCCESS: {
      return translatesAdapter.addAll(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case TranslatesActionTypes.LOAD_FAILURE: {
      return translatesAdapter.removeAll(
        state
      );
    }
    case TranslatesActionTypes.SET_FAILURE: {
      return  {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case TranslatesActionTypes.UPDATE_SUCCESS: {
      return translatesAdapter.updateOne({
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
