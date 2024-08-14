export interface Stadium {
  id: number;
  name: string;
  full_name: string;
  latitude: number;
  longitude: number;
}
export interface ParkingInfo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  link: string;
  stadium: Stadium;
}
