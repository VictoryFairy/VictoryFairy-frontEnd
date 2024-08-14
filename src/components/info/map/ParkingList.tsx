import styled from "styled-components";

import { useRef } from "react";
import gps from "@/assets/Icons/location.svg";
import arrow from "@/assets/Icons/plus.svg";
import naver from "@/assets/Icons/naver.svg";
import { ParkingInfo } from "@/types/Stadium";

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
            <Icon src={gps} alt='location' />
            <ParkingInf>
              <ParkingName>{spot.name}</ParkingName>
              <ParkingAddress>{spot.address}</ParkingAddress>
            </ParkingInf>
          </LeftContent>
          <RightContent>
            <NaverIcon
              src={naver}
              alt='naver'
              onClick={() => (window.location.href = spot.link)}
            />
            <img src={arrow} alt='arrow' />
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
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const NaverIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
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
