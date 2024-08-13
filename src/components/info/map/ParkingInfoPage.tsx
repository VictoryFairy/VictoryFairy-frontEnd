import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StadiumList from "./StadiumList";
import Map from "./Map";
import { getParkingInfosByStadiumId } from "../../../api/info/info.api";
import { ParkingInfo } from "../../../types/Stadium";
import ParkingList from "./ParkingList";
import { useAuthStore } from "../../../store/authStore";
import { getStadiumId } from "../../../utils/getStadiumId";

const ParkingInfoPage = () => {
  const { teamId } = useAuthStore();
  const [selectedStadiumId, setSelectedStadiumId] = useState(
    getStadiumId(teamId),
  );
  const [selectedParking, setSelectedParking] = useState<Omit<
    ParkingInfo,
    "stadium"
  > | null>(null);

  const { data } = useQuery<ParkingInfo[]>({
    queryKey: ["parkingInfos", selectedStadiumId],
    queryFn: () => getParkingInfosByStadiumId(selectedStadiumId),
    enabled: !!selectedStadiumId,
  });

  useEffect(() => {
    if (data) {
      setSelectedParking(null);
    }
  }, [data]);
  if (!data) return;

  console.log(data);
  const stadiumData = data?.[0].stadium;
  const parkingSpots = data?.map((parkingInfo) => ({
    id: parkingInfo.id,
    name: parkingInfo.name,
    latitude: parkingInfo.latitude,
    longitude: parkingInfo.longitude,
    address: parkingInfo.address,
    link: parkingInfo.link,
  }));

  return (
    <div>
      {/* <SearchBar>
        <SearchInput placeholder='구장명 , 팀명을 검색해보세요.' />
        <SearchIcon src={search} />
      </SearchBar> */}
      <StadiumList
        setSelectedStadiumId={setSelectedStadiumId}
        selectedStadiumId={selectedStadiumId}
      />
      <Map
        selectedStadium={stadiumData}
        parkingSpots={parkingSpots}
        selectedParking={selectedParking}
      />

      <ParkingList
        parkingSpots={parkingSpots}
        onSelectParking={setSelectedParking}
      />
    </div>
  );
};
// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   background-color: #f8f8f8;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const SearchInput = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   outline: none;
//   font-size: 14px;
// `;

// const SearchIcon = styled.img`
//   color: #888;
//   cursor: pointer;
// `;

export default ParkingInfoPage;
