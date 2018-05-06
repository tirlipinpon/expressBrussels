export interface PrixZone {
  zone1: number,
  zone2: number,
  zone3: number,
  prixKm: number,
  after15h: number,
}
export interface MyPrixZoneState {
  data: PrixZone;
}
