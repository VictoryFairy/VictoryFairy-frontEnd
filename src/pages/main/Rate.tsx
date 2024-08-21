import styled from "styled-components";
import { typography } from "@/style/typography";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { useMemo, useState } from "react";
import { getUserInfo } from "@/api/home/home.api";
import { useQuery } from "@tanstack/react-query";
import DonutChart from "@/components/main/DonutChart";
import { Record } from "@/types/Record";
import { useNavigate } from "react-router-dom";

const Rate = () => {
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
  return (
    <RateContainer>
      <MyRate>
        <button
          type='button'
          className='my-rate-button'
          onClick={() => navigate("/DetailRate", { state: { data } })}>
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

      <ButtonGroup>
        <button type='button'>
          <Icon icon='IcDownload' fill='var(--gray-900)' />
          <Text variant='title_01'>이미지 저장</Text>
        </button>
        <button type='button'>
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
