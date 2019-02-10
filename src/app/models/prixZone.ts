export interface PrixZone {
  id: number;
  zone1: number;
  zone2: number;
  zone3: number;
  prixKm: number;
  after15h: number;
  double_express: number;
  go_and_back: number;
  id_client?: number
}
export interface MyPrixZoneState {
  data: PrixZone;
}
export interface MyPrixZonesState {
  data: PrixZone[];
}
