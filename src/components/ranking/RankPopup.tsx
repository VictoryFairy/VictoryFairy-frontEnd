import { motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getRankList } from "@/api/rank/rank.api";
import { Rank } from "@/types/Rank";
import { useEffect, useState, useRef } from "react";
import Text from "../common/Text";
import RankTextComp from "./RankTextComp";
import MyRankComp from "./MyRankComp";
import { RankTextWrapper } from "./RankingTab";

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
  const [canDrag, setCanDrag] = useState(true);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const { data } = useQuery<Rank[]>({
    queryKey: ["getRankList", { teamId }],
    queryFn: () => getRankList(teamId),
  });

  useEffect(() => {
    if (data) {
      setRanking(data);
    }
  }, [data]);

  const handleScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollHeight - scrollTop === clientHeight;

      setCanDrag(isScrollable && (isAtTop || isAtBottom));
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (!canDrag) {
      event.preventDefault();
    }
  };

  return (
    <MotionPopup
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag='y'
      dragConstraints={{ top: 0 }}
      dragElastic={1}
      onDrag={handleDrag}
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
          ref={scrollableRef}
          onScroll={handleScroll}
          onTouchStart={handleScroll}>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

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
`;

export default RankPopup;
