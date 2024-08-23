import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getParkingInfosByStadiumId, getStadiums } from "@/api/info/info.api";
import { ParkingInfo, Stadium } from "@/types/Stadium";
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

  const { data: stadiums, isLoading: isLoadingStadiums } = useQuery<Stadium[]>({
    queryKey: ["stadiums"],
    queryFn: getStadiums,
    staleTime: Infinity,
  });

  const { data: parkingInfos } = useQuery<ParkingInfo[]>({
    queryKey: ["parkingInfos", selectedStadiumId],
    queryFn: () => getParkingInfosByStadiumId(selectedStadiumId),
    enabled: !!selectedStadiumId,
    staleTime: Infinity,
  });

  const [sortedStadiums, setSortedStadiums] = useState<Stadium[]>([]);

  useEffect(() => {
    if (stadiums && sortedStadiums.length === 0) {
      const sorted = [...stadiums].sort((a, b) => {
        if (a.id === selectedStadiumId) return -1;
        if (b.id === selectedStadiumId) return 1;
        return 0;
      });
      setSortedStadiums(sorted);
    }
  }, [stadiums, sortedStadiums, selectedStadiumId]);

  useEffect(() => {
    if (parkingInfos) {
      setSelectedParking(null);
    }
  }, [parkingInfos]);

  if (isLoadingStadiums || !parkingInfos) return <div>로딩중...</div>;

  const stadiumData = parkingInfos?.[0].stadium;
  const parkingSpots = parkingInfos?.map((parkingInfo) => ({
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
        stadiums={sortedStadiums}
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
