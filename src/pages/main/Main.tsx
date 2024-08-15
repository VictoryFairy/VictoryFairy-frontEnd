import styled from "styled-components";
import { useState } from "react";
import Tabs from "@/components/common/Tabs";
import Rate from "./Rate";
import Watch from "./Watch";

const Main = () => {
  const [activeTab, setActiveTab] = useState(0);
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Rate />;
      case 1:
        return <Watch />;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <Tabs
        labels={["승률", "내 직관"]}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      {renderContent()}
    </MainContainer>
  );
};
const MainContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Main;
