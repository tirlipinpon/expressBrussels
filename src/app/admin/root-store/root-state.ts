import { ClientsStoreState } from './clients-store';
import { OrdersStoreState } from './orders-store';
import { PrixZonesMotoStoreState } from './prix-zone-moto-store';
import { PrixZonesCarStoreState } from './prix-zone-car-store';


export interface State {
  clients: ClientsStoreState.ClientsState;
  orders: OrdersStoreState.OrdersState;
  prixZonesMoto: PrixZonesMotoStoreState.PrixZonesMotoState;
  prixZonesCar: PrixZonesCarStoreState.PrixZonesCarState;
}
