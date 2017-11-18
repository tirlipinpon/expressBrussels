import {DataForm} from "../models/DataForm";
import {PurchasseOrder} from "../models/purchasseOrder";

export interface AppState {
  customer: DataForm;
  removals: DataForm[];
  recipients: DataForm[];
  order: PurchasseOrder;
  orders: PurchasseOrder[];
}
