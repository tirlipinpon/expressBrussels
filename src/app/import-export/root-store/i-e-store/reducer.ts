/**
 * Created by tirli on 18-02-19.
 */
import { IEActions, ActionTypes } from './actions';
import { importExportAdapter, initialState, ImportExportState } from './state';

export function ImportExportReducer(state = initialState, action: IEActions): ImportExportState {
  switch (action.type) {
    case ActionTypes.ADD_SUCCESS: {
      return importExportAdapter.addOne(
        action.payload.item,
        {
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
    default: {
      return state;
    }
  }
}
