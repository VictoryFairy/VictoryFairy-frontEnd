import styled from "styled-components";
import { ParkingInfo } from "../../../types/Stadium";

interface ParkingListProps {
  parkingSpots: Omit<ParkingInfo, "stadium">[];
  onSelectParking: (spot: Omit<ParkingInfo, "stadium">) => void;
}

const ParkingList = ({ parkingSpots, onSelectParking }: ParkingListProps) => {
  return (
    <ParkingListContainer>
      <h2>주차정보</h2>
      {parkingSpots.length === 0 && <div>아무것도 없다</div>}
      {parkingSpots.map((spot) => (
        <ParkingItem key={spot.id} onClick={() => onSelectParking(spot)}>
          <ParkingName>
            {/* <FaParking color='#4A90E2' /> */}
            {spot.name}
          </ParkingName>
          <ParkingAddress>
            {/* <FaMapMarkerAlt color='#4A90E2' /> */}
            {spot.address}
          </ParkingAddress>
        </ParkingItem>
      ))}
    </ParkingListContainer>
  );
};
const ParkingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ParkingItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ParkingName = styled.h3`
  margin: 0 0 10px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ParkingAddress = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export default ParkingList;
