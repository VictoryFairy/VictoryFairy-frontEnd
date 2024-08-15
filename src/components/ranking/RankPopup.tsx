import { motion } from "framer-motion";
import styled from "styled-components";
import Text from "../common/Text";
import {
  RankText,
  RankTextWrapper,
  RankTextLeft,
  MyRank,
  RankTextRight,
  MyRanks,
} from "./RankingTab";
import Button from "../common/Button";

interface PopupProps {
  isOpen: boolean;
  handleClose: () => void;
}

const RankPopup = ({ isOpen, handleClose }: PopupProps) => {
  return (
    <MotionPopup
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag='y'
      dragConstraints={{ top: 0 }}
      onDragEnd={(e, info) => {
        if (info.point.y > 300) {
          handleClose();
        }
      }}>
      <RankPopupWrapper>
        <Text variant='headline' color='#545F71'>
          전체 랭킹
        </Text>
        <RankTextWrapper>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
          <RankText>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01' color='var(--gray-400)'>
                김예지
              </Text>
            </RankTextLeft>
            <Text variant='title_01' color='var(--gray-400)'>
              00P
            </Text>
          </RankText>
        </RankTextWrapper>
        <div>
          <MyRank>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01'>김예지</Text>
            </RankTextLeft>
            <RankTextRight>
              <Text variant='title_01' color='var(--primary-color)'>
                00P
              </Text>
              <Button>
                <Text variant='subtitle_01' color='var(--white)'>
                  up^
                </Text>
              </Button>
            </RankTextRight>
          </MyRank>
          <MyRanks>
            <Text variant='subtitle_01' color='var(--gray-900)'>
              나의 승률
            </Text>
            <Text variant='caption' color='var(--gray-900)'>
              00%
            </Text>
          </MyRanks>
          <MyRanks>
            <Text variant='subtitle_01' color='var(--gray-900)'>
              직관 경기 누적수
            </Text>
            <Text variant='caption' color='var(--gray-900)'>
              5회
            </Text>
          </MyRanks>
        </div>
      </RankPopupWrapper>
    </MotionPopup>
  );
};

const MotionPopup = styled(motion.div)`
  position: fixed;
  bottom: 0;
  height: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-radius: 20px 20px 0 0;
  z-index: 1001;
  max-width: 440px;
  width: 100%;
  background-color: var(--white);
`;

const RankPopupWrapper = styled.div`
  > :nth-child(1) {
    padding-top: 20px;
    padding-left: 20px;
    height: 15%;
  }
  > :nth-child(2) {
    height: 45%;
    overflow-y: scroll;
  }
  > :nth-child(3) {
    position: absolute;
    height: 45%;
    background-color: var(--white);
    width: 100%;
    bottom: 0;
    z-index: 100;
    padding: 10px 20px 30px 20px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;
export default RankPopup;
