import { useState } from "react";
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

  // const { data } = useQuery<ParkingInfo[]>({
  //   queryKey: ["parkingInfos", selectedStadiumId],
  //   queryFn: () => getParkingInfosByStadiumId(selectedStadiumId),
  // });

  // useEffect(() => {
  //   if (data) {
  //     setSelectedParking(null);
  //   }
  // }, [data]);
  // if (!data) return;
  // const stadiumData = data?.[0].stadium;
  // const parkingSpots = data?.map((parkingInfo) => ({
  //   id: parkingInfo.id,
  //   name: parkingInfo.name,
  //   is_free: parkingInfo.is_free,
  //   latitude: parkingInfo.latitude,
  //   longitude: parkingInfo.longitude,
  //   address: parkingInfo.address,
  // }));
  const stadiumData = {
    id: 1,
    name: "잠실",
    latitude: 35.8409,
    longitude: 128.6828,
    address: "잠실",
  };
  const parkingSpots = [
    {
      id: 1,
      address: "대구 수성구 알파시티1로 232",
      name: "데이터뱅크 주차장",
      latitude: 35.83883,
      longitude: 128.68388,
    },
    {
      id: 2,
      address: "대구 수성구 대구미술관",
      name: "미술관 주차장 주차장",
      latitude: 35.8276258,
      longitude: 128.6739499,
    },
    {
      id: 3,
      address: "대구 수성구 대구미술관",
      name: "미술관 주차장 주차장",
      latitude: 35.8276258,
      longitude: 128.6739499,
    },
    {
      id: 4,
      address: "대구 수성구 대구미술관",
      name: "미술관 주차장 주차장",
      latitude: 35.8276258,
      longitude: 128.6739499,
    },
  ];
  return (
    <div>
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

export default ParkingInfoPage;
