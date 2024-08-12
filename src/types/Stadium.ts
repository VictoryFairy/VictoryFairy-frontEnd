export interface Stadium {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}
export interface ParkingInfo {
  id: number;
  name: string;
  is_free?: boolean;
  latitude: number;
  longitude: number;
  address: string;
  stadium: Stadium;
}
