export interface Contact {
  id?: number;
  name: string;
  fk_client_id: number;
  fk_resp_dest_id: number;
}

export interface ContactState {
  data: Contact[];
  count: number;
}
