import { useState } from "react";
import styled from "styled-components";
import ParkingInfoPage from "../components/info/map/ParkingInfoPage";

const Info = () => {
  const [activeTab, setActiveTab] = useState<"map" | "cheer">("map");

  const handleTabChange = (tab: "map" | "cheer") => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Tabs>
        <TabButton
          active={activeTab === "map"}
          onClick={() => handleTabChange("map")}>
          주차정보
        </TabButton>
        <TabButton
          active={activeTab === "cheer"}
          onClick={() => handleTabChange("cheer")}>
          응원가
        </TabButton>
      </Tabs>

      {activeTab === "map" && <ParkingInfoPage />}
      {activeTab === "cheer" && (
        <div>
          {/* <Heading>응원가</Heading> */}
          <p>응원가는 아직 준비되지 않았습니다.</p>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Tabs = styled.div`
  display: flex;
  gap: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 15px 0;
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? "#000" : "#888")};
  font-size: 18px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
`;

export default Info;