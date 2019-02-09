import { ClientsStoreState } from './clients-store';
import { PrixZonesMotoStoreState } from './prix-zone-moto-store';


export interface State {
  clients: ClientsStoreState.ClientsState;
  prixZonesMoto: PrixZonesMotoStoreState.PrixZonesMotoState;
}
