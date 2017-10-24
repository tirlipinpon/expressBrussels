import {DataForm} from "../models/DataForm";

export interface AppState {
  customer: DataForm;
  removal: DataForm[];
  recipient: DataForm[];
}
