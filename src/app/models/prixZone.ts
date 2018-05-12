export interface PrixZone {
  zone1: number;
  zone2: number;
  zone3: number;
  prixKm: number;
  after15h: number;
  double_express: number;
  go_and_back: number;
}
export interface MyPrixZoneState {
  data: PrixZone;
}
