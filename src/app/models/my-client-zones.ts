export interface MyClientZones {
  id: number;
  cp: number;
  state: string;
  zone: number;
}

export interface MyClientZonesState {
  data: MyClientZones[];
  count: number
}
