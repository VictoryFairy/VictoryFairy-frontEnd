import { useEffect, useState, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { getParkingInfosByStadiumId, getStadiums } from "@/api/info/info.api";
import { ParkingInfo, Stadium } from "@/types/Stadium";
import { useAuthStore } from "@/store/authStore";
import { getStadiumId } from "@/utils/getStadiumId";
import Loading from "@/components/common/Loading";
import ParkingList from "./ParkingList";
import StadiumList from "./StadiumList";

const Map = lazy(() => import("./Map"));

const ParkingInfoPage = () => {
  const { teamId } = useAuthStore();
  console.log(teamId);
  const [selectedStadiumId, setSelectedStadiumId] = useState(
    getStadiumId(teamId),
  );
  const [selectedParking, setSelectedParking] = useState<Omit<
    ParkingInfo,
    "stadium"
  > | null>(null);

  const { data: stadiums, isError: isStadiumsError } = useQuery<Stadium[]>({
    queryKey: ["stadiums"],
    queryFn: getStadiums,
    staleTime: Infinity,
  });

  const {
    data: parkingInfos,
    isLoading: parkingInfosLoading,
    isError: isParkinginfosError,
  } = useQuery<ParkingInfo[]>({
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

  const stadiumData = parkingInfos?.[0].stadium;
  const parkingSpots = parkingInfos?.map((parkingInfo) => ({
    id: parkingInfo.id,
    name: parkingInfo.name,
    latitude: parkingInfo.latitude,
    longitude: parkingInfo.longitude,
    address: parkingInfo.address,
    link: parkingInfo.link,
  }));

  if (isStadiumsError || isParkinginfosError) {
    throw new Error("서버문제로 인한 에러.");
  }
  return (
    <div style={{ marginBottom: "70px" }}>
      <StadiumList
        setSelectedStadiumId={setSelectedStadiumId}
        selectedStadiumId={selectedStadiumId}
        stadiums={sortedStadiums}
        myteam={getStadiumId(teamId)}
      />
      <Suspense fallback={<Loading />}>
        <Map
          selectedStadium={stadiumData}
          parkingSpots={parkingSpots}
          selectedParking={selectedParking}
          parkingInfosLoading={parkingInfosLoading}
        />
      </Suspense>
      <ParkingList
        parkingSpots={parkingSpots}
        onSelectParking={setSelectedParking}
      />
    </div>
  );
};

export default ParkingInfoPage;
