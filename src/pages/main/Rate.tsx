import styled from "styled-components";
import { typography } from "@/style/typography";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { useMemo, useRef, useState } from "react";
import { getUserInfo } from "@/api/home/home.api";
import { useQuery } from "@tanstack/react-query";
import DonutChart from "@/components/main/DonutChart";
import { Record } from "@/types/Record";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";

const Rate = () => {
  const rateRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [imgChange, setImgChange] = useState<boolean>(true);
  const { data } = useQuery<Record>({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });

  const winPercentage = useMemo(() => {
    if (data && data.total > 0) {
      return ((data.win / data.total) * 100).toFixed(2);
    }
    return "0.00";
  }, [data]);

  const handleDownload = async () => {
    if (!rateRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(rateRef.current, {
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "승리요정.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("이미지 저장에 실패했습니다.", error);
    }
  };
  const handleKakaoShare = async () => {
    if (!rateRef.current) {
      return;
    }

    try {
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "승리요정",
          description: `나의 승률: ${winPercentage}%`,
          imageUrl:
            "https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "앱에서 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } catch (error) {
      console.error("카카오톡 공유에 실패했습니다.", error);
    }
  };
  return (
    <RateContainer>
      <div ref={rateRef}>
        <MyRate>
          <button
            type='button'
            className='my-rate-button'
            onClick={() => navigate("/DetailRate", { state: { datas: data } })}>
            <Text variant='title_01'>내 승률</Text>
            <Icon icon='IcArrowRight' fill='var(--gray-900)' />
          </button>
          <div
            role='button' // 1. Add an appropriate ARIA role
            tabIndex={0}
            onClick={() => setImgChange(!imgChange)}>
            <Text variant='display'>
              {winPercentage}
              <Text variant='headline'>%</Text>
            </Text>
            <Icon icon='IcSwitch' fill='var(--gray-900)' />
          </div>
          <Text variant='subtitle_03' className='my-rate-record'>
            {data?.total}전 {data?.win}승 {data?.lose}패 {data?.tie}무
          </Text>
        </MyRate>
        <hr />
        {imgChange ? (
          <div className='img'>
            <img alt='이미지' />
          </div>
        ) : data ? (
          <DonutChart record={data} />
        ) : (
          <p>No data available</p>
        )}
      </div>

      <ButtonGroup>
        <button
          type='button'
          onClick={handleDownload}
          style={{ cursor: "pointer" }}>
          <Icon icon='IcDownload' fill='var(--gray-900)' />
          <Text variant='title_01'>이미지 저장</Text>
        </button>
        <button
          type='button'
          onClick={handleKakaoShare}
          style={{ cursor: "pointer" }}>
          <Icon icon='IcShare' fill='var(--gray-900)' />
          <Text variant='title_01'>공유하기</Text>
        </button>
      </ButtonGroup>
    </RateContainer>
  );
};
const RateContainer = styled.div`
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px 12px;
  padding: 0px 12px;
  position: relative;
  background-color: #fff;
  > :nth-child(3) {
    margin: 0 auto;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 25%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 15px;
    z-index: 1;
  }

  &::before {
    border-right: 1px solid #e5e5e5;
    left: -13px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &::after {
    border-left: 1px solid #e5e5e5;
    right: -13px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  .img {
    background: var(--gray-50);
    border: none;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 8px;
    margin-top: 10px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
  hr {
    margin-top: 13px;
    width: 90%;
    border: 1px dashed #2f3036;
  }
`;

const MyRate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 8px;
  padding-top: 20px;

  .my-rate-button {
    display: flex;
    align-items: center;
    width: fit-content;
    background-color: var(--white);
    cursor: pointer;
    svg {
      width: 16px;
      height: 16px;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
  .my-rate-record {
    ${typography.subtitle_03}
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  margin-top: 4px;
  padding: 0px 20px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 42px;
    background-color: var(--white);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default Rate;
