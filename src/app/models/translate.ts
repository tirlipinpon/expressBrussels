/**
 * Created by tirli on 15-02-19.
 */
import {Destination} from "./destination";

export interface OrderTranslate {
  id: number;
  uuid: string;
  country: string;
  reference: string;
  docName: string;
  originalNbr: number;
  translateNbr: number;
  copyNbr: number;
  originalCheck: boolean;
  translateCheck: boolean;
  copyCheck: boolean;
  greffeInstanceCheck: boolean;
  coursAppelCheck: boolean;
  spfEtrangereCheck: boolean;
  spfJusticeCheck: boolean;
  communeCheck: boolean;
  notaireCheck: boolean;
  procedureType: string; // normal/urgent
  created: string;
  valid: boolean;
  price: number;
  typeProcedure: string // normal/urgent
  fk_client_id: number;
  destination: Destination[]
}

export interface TranslateState {
  data: OrderTranslate[];
  count: number;
}
