/**
 * Created by tirli on 30-01-19.
 */
import {Actions, PrixZonesMotoActionTypes} from "./actions";
import {initalPrixZonesMotoState, PrixZonesMotoState, prixZonesMotoAdapter} from "./state";

export function prixZonesMotoReducer(state = initalPrixZonesMotoState, action: Actions): PrixZonesMotoState {
  switch (action.type) {
    // case PrixZonesMotoActionTypes.LOAD_REQUEST: {
    //   return {
    //     ...state,
    //     isLoading: true,
    //     error: null
    //   };
    // }
    case PrixZonesMotoActionTypes.LOAD_SUCCESS: {
      return prixZonesMotoAdapter.addAll(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesMotoActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case PrixZonesMotoActionTypes.ADD_SUCCESS: {
      return prixZonesMotoAdapter.addOne(
        action.payload.item,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesMotoActionTypes.REMOVE_REQUEST: {
      return prixZonesMotoAdapter.removeOne(
        action.payload,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case PrixZonesMotoActionTypes.UPDATE_SUCCESS: {
      return prixZonesMotoAdapter.updateOne({
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
    case PrixZonesMotoActionTypes.UPSERT_REQUEST: {
      return prixZonesMotoAdapter.upsertOne(
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
