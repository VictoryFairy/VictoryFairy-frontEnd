import styled from "styled-components";
import SwitchIcon from "@/assets/Icons/switch.svg?react";
import ArrowRight from "@/assets/Icons/arrow-right.svg?react";
import Download from "@/assets/Icons/download.svg?react";
import Share from "@/assets/Icons/share.svg?react";
import { typography } from "@/style/typography";

const Rate = () => {
  return (
    <RateContainer>
      <MyRate>
        <button type='button' className='my-rate-button'>
          내 승률
          <ArrowRight />
        </button>
        <div>
          <span>80%</span>
          <SwitchIcon />
        </div>
        <span className='my-rate-record'>11전 8승 2패 0무</span>
      </MyRate>
      <hr />
      <div className='img'>
        <img alt='이미지' />
      </div>
      <ButtonGroup>
        <button type='button'>
          <Download />
          이미지 저장
        </button>
        <button type='button'>
          <Share />
          공유하기
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
    ${typography.title_02}
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
    ${typography.display}
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
    ${typography.title_01}
    background-color: var(--white);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default Rate;
