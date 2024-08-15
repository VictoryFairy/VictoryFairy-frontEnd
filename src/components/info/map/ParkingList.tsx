import styled from "styled-components";

import { useRef } from "react";

import { ParkingInfo } from "../../../types/Stadium";
import Icon from "../../common/Icon";

interface ParkingListProps {
  parkingSpots: Omit<ParkingInfo, "stadium">[];
  onSelectParking: (spot: Omit<ParkingInfo, "stadium">) => void;
}

const ParkingList = ({ parkingSpots, onSelectParking }: ParkingListProps) => {
  const itemRefs = useRef<HTMLDivElement>(null);

  const handleClick = (spot: Omit<ParkingInfo, "stadium">) => {
    if (!itemRefs.current) return;
    onSelectParking(spot);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ParkingListContainer ref={itemRefs}>
      {parkingSpots.length === 0 && <div>주차 정보가 없습니다</div>}
      {parkingSpots.map((spot) => (
        <ParkingItem key={spot.id} onClick={() => handleClick(spot)}>
          <LeftContent>
            <Icon icon='IcLocation' />
            <ParkingInf>
              <ParkingName>{spot.name}</ParkingName>
              <ParkingAddress>{spot.address}</ParkingAddress>
            </ParkingInf>
          </LeftContent>

          <RightContent>
            <Icon
              icon='IcNaver'
              fill='#03C75A'
              onClick={() => (window.location.href = spot.link)}
            />
            <Icon icon='IcArrowRight' />
          </RightContent>
        </ParkingItem>
      ))}
    </ParkingListContainer>
  );
};

const ParkingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const ParkingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ParkingInf = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParkingName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const ParkingAddress = styled.span`
  font-size: 12px;
  color: #666;
`;

export default ParkingList;
