import { motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getRankList } from "@/api/rank/rank.api";
import { Rank } from "@/types/Rank";
import { useEffect, useState, useRef } from "react";
import Text from "../common/Text";
import { RankTextWrapper } from "./RankingTab";
import RankTextComp from "./RankTextComp";
import MyRankComp from "./MyRankComp";

interface PopupProps {
  isOpen: boolean;
  handleClose: () => void;
  teamId: number;
  withUser?: Rank | null;
  totalGames?: number;
  win?: number;
}

const RankPopup = ({
  isOpen,
  handleClose,
  teamId,
  withUser,
  totalGames,
  win,
}: PopupProps) => {
  const [ranking, setRanking] = useState<Rank[]>([]);
  const { data } = useQuery<Rank[]>({
    queryKey: ["getRankList", { teamId }],
    queryFn: () => getRankList(teamId),
  });
  const rankTextWrapperRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (data) {
      setRanking(data);
    }
  }, [data]);

  const handleScrollStart = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setTimeout(() => setIsScrolling(false), 100); // 잠시 후 드래그 다시 활성화
  };

  return (
    <MotionPopup
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag='y'
      dragConstraints={{ top: 0 }}
      dragElastic={isScrolling ? 0 : 1} // 스크롤 중일 때는 드래그를 비활성화
      onDragEnd={(_, info) => {
        if (info.point.y > 600) {
          handleClose();
        }
      }}>
      <RankPopupWrapper>
        <Text variant='headline' color='#545F71'>
          전체 랭킹
        </Text>
        <RankTextWrapper
          ref={rankTextWrapperRef}
          onTouchStart={handleScrollStart} // 모바일 터치 시작
          onTouchEnd={handleScrollEnd} // 모바일 터치 종료
          onScroll={handleScrollStart} // 스크롤이 시작될 때
          onWheel={handleScrollStart} // 마우스 휠 이벤트 (웹)
          onMouseLeave={handleScrollEnd} // 마우스가 영역을 벗어날 때
        >
          {ranking.map((element) => (
            <RankTextComp
              key={element.userId}
              rank={element.rank}
              score={element.score}
              image={element.image}
              nickname={element.nickname}
              userId={element.userId}
            />
          ))}
        </RankTextWrapper>
        <div>
          {withUser?.image ? (
            <MyRankComp
              withUser={withUser || null}
              win={win ?? 0}
              totalGames={totalGames ?? 0}
            />
          ) : null}
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
