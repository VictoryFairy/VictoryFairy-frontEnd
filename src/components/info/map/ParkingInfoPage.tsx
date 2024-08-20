import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getParkingInfosByStadiumId } from "@/api/info/info.api";
import { ParkingInfo } from "@/types/Stadium";
import { useAuthStore } from "@/store/authStore";
import { getStadiumId } from "@/utils/getStadiumId";
import ParkingList from "./ParkingList";
import Map from "./Map";
import StadiumList from "./StadiumList";

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
    staleTime: Infinity,
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
    <div style={{ marginBottom: "70px" }}>
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
