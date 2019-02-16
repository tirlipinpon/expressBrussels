/**
 * Created by tirli on 15-02-19.
 */
export interface Destination {
  id?: number;
  orderType: string; // translate/import-export
  kind: string; // removal/recipient/commune/notaire
  name: string;
  contact?: string;
  phone: string;
  message?: string;
  fk_uuid: string; // uuid_translate/uuid_import-export
  address: string;
  number: string | number;
  cp: number;
  state: string;
}
