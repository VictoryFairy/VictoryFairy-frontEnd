import styled from "styled-components";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { Game } from "@/types/Game";
import { isCanceledGame } from "@/utils/isCanceledGame";
import moment from "moment";

interface GameStadiumInfoProps {
  match: Game;
  isDoubleHeader: boolean;
}

const GameStadiumInfo = ({ match, isDoubleHeader }: GameStadiumInfoProps) => {
  return (
    <GameStadiumInfoContainer>
      <div>
        <Icon icon='IcLocation' width={15} height={15} />
        <Text variant='caption'> {match.stadium.name} 야구장</Text>
      </div>
      <div>
        {isCanceledGame(match.status) ? (
          <CanceledText variant='caption'>경기 취소</CanceledText>
        ) : (
          <TimeInfoContainer>
            {isDoubleHeader ? (
              <Text variant='caption'>더블헤더</Text>
            ) : (
              <Text variant='caption'>
                {moment(match.time, "HH:mm:ss").format("HH:mm")}
              </Text>
            )}
          </TimeInfoContainer>
        )}
      </div>
    </GameStadiumInfoContainer>
  );
};

const GameStadiumInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  white-space: nowrap;
`;

const TimeInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CanceledText = styled(Text)`
  font-weight: 700;
`;

export default GameStadiumInfo;
