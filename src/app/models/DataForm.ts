export interface DataForm {
  id: number;
  name: string;
  ref_client: string;
  address: string;
  number: string;
  cp: number;
  state: string;
  clientZone: number;
  phone: string;
  infos: {
    info1: string;
    info2: string
  };
  type: number;
  fk_client: number;
  active:  number;
  created: any;
  fk_type: number;
}

export interface DataDataFormState {
  data: DataForm[];
  count: number
}

