export interface DataForm {
  id: number,
  name: string,
  address: string,
  number: string,
  cp: number,
  state: string,
  phone: string,
  info1: string,
  info2: string,
  type: number,
  fk_client: number,
  active:  boolean,
  created: Date,
  fk_type: number
}

