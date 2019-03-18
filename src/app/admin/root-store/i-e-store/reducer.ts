/**
 * Created by tirli on 13-02-19.
 */
import {Actions, ImportExportActionTypes} from "./actions";
import {initalImportExportState, ImportExportState, importExportAdapter} from "./state";

export function importExportReducer(state = initalImportExportState, action: Actions): ImportExportState {
  switch (action.type) {
    case ImportExportActionTypes.LOAD_SUCCESS: {
      return importExportAdapter.addAll(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      )
    }
    case ImportExportActionTypes.LOAD_FAILURE: {
      return importExportAdapter.removeAll(
        state
      );
    }
    case ImportExportActionTypes.SET_FAILURE: {
      return  {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case ImportExportActionTypes.UPDATE_SUCCESS: {
      return importExportAdapter.updateOne({
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
    // case ImportExportActionTypes.UPDATE_ADMINISTRATIONS_SUCCESS: {
    //   return importExportAdapter.updateOne({
    //       id: action.payload.items.id,
    //       changes: action.payload.items
    //     },
    //     {
    //       ...state,
    //       isLoading: false,
    //       error: null
    //     }
    //   )
    // }
    default: {
      return state;
    }
  }
}
