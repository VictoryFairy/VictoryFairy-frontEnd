import styled from "styled-components";
import { useState, Suspense, lazy, useEffect } from "react";
import Tabs from "@/components/common/Tabs";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { sendGaEvent } from "@/utils/sendGaEvent";
import { DetailHelmet } from "../helmets/DetailHelmet";
import { usePopup } from "@/hooks/usePopup";

const Rate = lazy(() => import("./Rate"));
const Watch = lazy(() => import("./Watch"));

const SERVICE_NOTICE_STORAGE_KEY = "serviceNoticeShown";

const Main = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { openPopup, closePopup, renderPopup } = usePopup();

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem(SERVICE_NOTICE_STORAGE_KEY);

    if (!hasSeenNotice) {
      openPopup({
        title: "승리요정 서비스가 잠시 중단됩니다",
        message: `11월 28일(금)부로 \n 승리요정 서비스가 잠시 중단됩니다.\n\n그동안 함께해주셔서 진심으로 감사드립니다.\n더 나은 모습으로 다시 찾아오겠습니다.\n\n궁금한 점이 있다면,\n마이페이지 → 문의사항을 통해 남겨주세요.`,
        buttons: [
          {
            label: "확인",
            variant: "confirm",
            onClick: () => {
              localStorage.setItem(SERVICE_NOTICE_STORAGE_KEY, "true");
              closePopup();
            },
          },
        ],
      });
    }
  }, [openPopup, closePopup]);

  const handleClickRegister = () => {
    sendGaEvent("버튼 클릭", "직관 기록하기 버튼 클릭", "직관 기록하기 버튼");
    navigate("/select-match");
  };

  const handleClickTab = (tab: number) => {
    switch (tab) {
      case 0:
        sendGaEvent("탭", "승률 탭 클릭", "승률 탭");
        break;
      case 1:
        sendGaEvent("탭", "내 직관 탭 클릭", "내 직관");
        break;
      default:
        break;
    }
    setActiveTab(tab);
  };

  return (
    <MainContainer>
      <DetailHelmet
        title='승률'
        eventDetail='승리요정 메인'
        pageTitle='승률 및 내 직관'
        url='sngyo.com/home'
      />
      <Tabs
        labels={["승률", "내 직관"]}
        activeTab={activeTab}
        onTabClick={handleClickTab}
      />
      <Suspense fallback={<Loading />}>
        {(() => {
          switch (activeTab) {
            case 0:
              return <Rate />;
            case 1:
              return <Watch />;
            default:
              return null;
          }
        })()}
      </Suspense>
      <Layer>
        <RegisterButton onClick={() => handleClickRegister()}>
          <Icon icon='IcEdit' />
          <Text variant='title_02'>직관 기록하기</Text>
        </RegisterButton>
      </Layer>
      {renderPopup()}
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
  width: 100%;
  max-width: 480px;
  position: fixed;
  bottom: 174px;
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
