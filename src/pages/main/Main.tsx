import styled from "styled-components";
import { useState } from "react";
import Tabs from "@/components/common/Tabs";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { useNavigate } from "react-router-dom";
import Rate from "./Rate";
import Watch from "./Watch";

const Main = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
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
      <Layer>
        <RegisterButton onClick={() => navigate("/select-match")}>
          <Icon icon='IcEdit' />
          <Text variant='title_02'>직관 기록하기</Text>
        </RegisterButton>
      </Layer>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  padding-bottom: 120px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Layer = styled.div`
  background-color: rgb(43, 110, 176);
  width: 100%;
  max-width: 480px;
  position: fixed;
  bottom: 125px;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  width: 152px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: var(--white);
  position: absolute;
  right: 10%;
  cursor: pointer;

  svg {
    fill: var(--white);
  }
`;

export default Main;
