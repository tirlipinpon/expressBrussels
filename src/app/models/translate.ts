/**
 * Created by tirli on 15-02-19.
 */
import {Destination} from "./destination";

export interface Translate {
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
  procedureCheck: string;
  creation: string;
  valid: boolean;
  price: number;
  type: string // normal/urgent
  fk_client_id: number;
  destination: Destination[]
}

export interface TranslateState {
  data: Translate[];
  count: number;
}
