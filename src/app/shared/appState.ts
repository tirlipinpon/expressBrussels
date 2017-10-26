import {DataForm} from "../models/DataForm";

export interface AppState {
  customer: DataForm;
  removals: DataForm[];
  recipients: DataForm[];
}
