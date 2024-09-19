import { useEffect, useState } from "react";
import styled from "styled-components";
import { typography } from "@/style/typography";
import ParkingInfoPage from "../components/info/map/ParkingInfoPage";
import CheerSongPage from "../components/info/cheerSong/CheerSongPage";

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
      <Tabs>
        <TabButton
          $active={activeTab === "map"}
          onClick={() => handleTabChange("map")}>
          주차정보
          {/* <Tooltip text='아래 주차장 리스트를 누르면 지도에서 위치를 확인할수 있어요!'>
            <Icon icon='IcInfo' />
          </Tooltip> */}
        </TabButton>
        <TabButton
          $active={activeTab === "cheer"}
          onClick={() => handleTabChange("cheer")}>
          응원가
        </TabButton>
      </Tabs>

      {activeTab === "map" && <ParkingInfoPage />}
      {activeTab === "cheer" && <CheerSongPage />}
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
