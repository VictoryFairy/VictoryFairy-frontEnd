import { motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getRankList } from "@/api/rank/rank.api";
import { Rank } from "@/types/Rank";
import { useEffect } from "react";
import Text from "../common/Text";
import { RankTextWrapper } from "./RankingTab";
import RankTextComp from "./RankTextComp";
import MyRankComp from "./MyRankComp";

interface PopupProps {
  isOpen: boolean;
  handleClose: () => void;
  teamId: number;
}

const RankPopup = ({ isOpen, handleClose, teamId }: PopupProps) => {
  const { data } = useQuery<Rank[]>({
    queryKey: ["getRankList", { teamId }],
    queryFn: () => getRankList(teamId),
  });
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <MotionPopup
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag='y'
      dragConstraints={{ top: 0 }}
      onDragEnd={(e, info) => {
        if (info.point.y > 600) {
          handleClose();
        }
      }}>
      <RankPopupWrapper>
        <Text variant='headline' color='#545F71'>
          전체 랭킹
        </Text>
        <RankTextWrapper>
          <RankTextComp />
          <RankTextComp />
          <RankTextComp />
          <RankTextComp />
          <RankTextComp />
          <RankTextComp />
        </RankTextWrapper>
        <div>
          <MyRankComp />
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
