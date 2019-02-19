import {Destination} from "./destination";
/**
 * Created by tirli on 18-02-19.
 */
export interface ImportExport {
  id: number;
  uuid: string;
  country: string;
  reference: string;
  creation: string;
  price: number;
  valid: boolean;
  fk_client_id: number;
  destination?: Destination[];
  administration?: Administration[];
}

export interface Administration {
  id: number;
  name: string;
  certifOriginCheck: boolean;
  annexCertifCheck: boolean;
  copyCertifCheck: boolean;
  invoicesCheck: boolean;
  copyInvoicesCheck: boolean;
  fk_uuid_ie: string;
}
