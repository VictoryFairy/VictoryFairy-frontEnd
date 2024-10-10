import { useEffect, useState, Suspense, lazy } from "react";
import styled from "styled-components";
import { typography } from "@/style/typography";
import Loading from "@/components/common/Loading";
import { DetailHelmet } from "./helmets/DetailHelmet";

const ParkingInfoPage = lazy(
  () => import("../components/info/map/ParkingInfoPage"),
);
const CheerSongPage = lazy(
  () => import("../components/info/cheerSong/CheerSongPage"),
);

const Info = () => {
  const [activeTab, setActiveTab] = useState<"map" | "cheer">(() => {
    return (localStorage.getItem("activeTab") as "map" | "cheer") || "map";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: "map" | "cheer") => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <DetailHelmet
        title='주차정보'
        eventDetail='주차정보 및 응원가'
        pageTitle='주차정보 및 응원가'
        url='sngyo.com/info'
      />
      <Tabs>
        <TabButton
          $active={activeTab === "map"}
          onClick={() => handleTabChange("map")}>
          주차정보
        </TabButton>
        <TabButton
          $active={activeTab === "cheer"}
          onClick={() => handleTabChange("cheer")}>
          응원가
        </TabButton>
      </Tabs>

      <Suspense fallback={<Loading />}>
        {activeTab === "map" && <ParkingInfoPage />}
        {activeTab === "cheer" && <CheerSongPage />}
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  margin: 15px 0;
  ${typography.display}
  color: ${({ $active }) => ($active ? "#000" : "#888")};
  cursor: pointer;
`;

export default Info;
