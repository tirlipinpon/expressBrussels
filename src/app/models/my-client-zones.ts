export interface MyClientZones {
  id: number;
  cp: number;
  ville: string;
  zone: number;
}

export interface MyClientZonesState {
  data: MyClientZones[];
  count: number
}
