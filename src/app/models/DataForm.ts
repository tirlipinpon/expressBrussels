export interface DataForm {
  id: number,
  name: string,
  address: string,
  number: string,
  cp: number,
  state: string,
  phone: string,
  infos: {
    info1: string,
    info2: string
  },
  type: number,
  fk_client: number,
  active:  number,
  created: Date,
  fk_type: number
}

export interface DataDataForm {
  data: DataForm[],
  count: number
}

