import { ParkingInfo, Stadium } from "@/types/Stadium";
interface MapProps {
    selectedStadium: Stadium;
    parkingSpots: Omit<ParkingInfo, "stadium">[];
    selectedParking: Omit<ParkingInfo, "stadium"> | null;
}
declare const Map: ({ selectedStadium, parkingSpots, selectedParking }: MapProps) => import("react/jsx-runtime").JSX.Element;
export default Map;
