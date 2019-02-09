/**
 * Created by tirli on 30-01-19.
 */
import {Actions, PrixZonesCarActionTypes} from "./actions";
import {initalPrixZonesCarState, PrixZonesCarState, prixZonesCarAdapter} from "./state";

export function prixZonesCarReducer(state = initalPrixZonesCarState, action: Actions): PrixZonesCarState {
  switch (action.type) {
    // case PrixZonesCarActionTypes.LOAD_REQUEST: {
    //   return {
    //     ...state,
    //     isLoading: true,
    //     error: null
    //   };
    // }
    case PrixZonesCarActionTypes.LOAD_SUCCESS: {
      return prixZonesCarAdapter.addAll(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesCarActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case PrixZonesCarActionTypes.ADD_SUCCESS: {
      return prixZonesCarAdapter.addOne(
        action.payload.item,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesCarActionTypes.REMOVE_REQUEST: {
      return prixZonesCarAdapter.removeOne(
        action.payload,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesCarActionTypes.UPDATE_SUCCESS: {
      return prixZonesCarAdapter.updateOne({
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
    case PrixZonesCarActionTypes.UPSERT_REQUEST: {
      return prixZonesCarAdapter.upsertOne(
        action.payload.item,
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
