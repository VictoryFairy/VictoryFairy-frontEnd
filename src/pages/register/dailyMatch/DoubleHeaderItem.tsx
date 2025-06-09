import Radio from "@/components/common/Radio";
import { GameType } from "@/types/Game";
import styled from "styled-components";
import Text from "@/components/common/Text";

interface DoubleHeaderItemProps {
  gameType: GameType;
  time: string;
}

const DoubleHeaderItem = ({ gameType, time }: DoubleHeaderItemProps) => {
  return (
    <DoubleHeaderItemContainer>
      <Radio
        className='radio'
        variant='square'
        checked={false}
        onChange={() => {}}
      />
      <TextContainer>
        {(() => {
          switch (gameType) {
            case GameType.DOUBLEHEADER_1:
              return <Text variant='subtitle_02'>더블헤더 1 차전</Text>;
            case GameType.DOUBLEHEADER_2:
              return <Text variant='subtitle_02'>더블헤더 2 차전</Text>;
            default:
              return null;
          }
        })()}
        <Divider />
        <TimeText variant='subtitle_02'>{time}</TimeText>
      </TextContainer>
    </DoubleHeaderItemContainer>
  );
};

const DoubleHeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 16px;

  .radio {
    width: 18px;
    height: 18px;
    & + img {
      width: 18px;
      height: 18px;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.span`
  width: 8px;
  height: 0px;
  border: 1px solid #efefef;
  transform: rotate(-90deg);
`;

const TimeText = styled(Text)`
  color: #393a3d;
`;

export default DoubleHeaderItem;
