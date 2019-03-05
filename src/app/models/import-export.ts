import {Destination} from "./destination";
/**
 * Created by tirli on 18-02-19.
 */
export interface ImportExport {
  id?: number;
  uuid: string;
  country: string;
  reference: string;
  created: string;
  price: number;
  valid: boolean;
  fk_client_id: number;
  procedureType: string; // normal/urgent

  destinations?: Destination[];

  administrations?: Administration[];
  adminName?: any // debug form step purpose
}

export interface Administration {
  id?: number;
  kind: string;
  certifCheck: boolean;
  annexeCheck: boolean;
  copyCheck: boolean;
  invoicesCheck: boolean;
  copyInvoicesCheck: boolean;
  fk_uuid_ie?: string;
}
