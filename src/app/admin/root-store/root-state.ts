import { ClientsStoreState } from './clients-store';
import { OrdersStoreState } from './orders-store';
import { TranslatesStoreState } from './translates-store';
import { ImportExportStoreState } from './i-e-store';
import { PrixZonesMotoStoreState } from './prix-zone-moto-store';
import { PrixZonesCarStoreState } from './prix-zone-car-store';


export interface State {
  clients: ClientsStoreState.ClientsState;
  orders: OrdersStoreState.OrdersState;
  translates: TranslatesStoreState.TranslatesState;
  import_export:ImportExportStoreState.ImportExportState;
  prixZonesMoto: PrixZonesMotoStoreState.PrixZonesMotoState;
  prixZonesCar: PrixZonesCarStoreState.PrixZonesCarState;
}
