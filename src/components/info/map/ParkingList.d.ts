import { ParkingInfo } from "@/types/Stadium";
interface ParkingListProps {
    parkingSpots: Omit<ParkingInfo, "stadium">[];
    onSelectParking: (spot: Omit<ParkingInfo, "stadium">) => void;
}
declare const ParkingList: ({ parkingSpots, onSelectParking }: ParkingListProps) => import("react/jsx-runtime").JSX.Element;
export default ParkingList;
