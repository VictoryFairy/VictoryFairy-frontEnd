import Radio from "@/components/common/Radio";
import { Game, GameType } from "@/types/Game";
import styled from "styled-components";
import Text from "@/components/common/Text";
import moment from "moment";

interface DoubleHeaderItemProps {
  match: Game;
  onSelect: (match: Game) => void;
  checked: boolean;
  disabled?: boolean;
}

const DoubleHeaderItem = ({
  match,
  onSelect,
  checked,
  disabled = false,
}: DoubleHeaderItemProps) => {
  return (
    <DoubleHeaderItemContainer $disabled={disabled}>
      <Radio
        className='radio'
        variant='square'
        checked={checked}
        onChange={() => !disabled && onSelect(match)}
        onClick={() => !disabled && onSelect(match)}
        disabled={disabled}
      />
      <TextContainer $disabled={disabled}>
        {(() => {
          switch (match.gameType) {
            case GameType.DOUBLEHEADER_1:
              return <Text variant='subtitle_02'>더블헤더 1 차전</Text>;
            case GameType.DOUBLEHEADER_2:
              return <Text variant='subtitle_02'>더블헤더 2 차전</Text>;
            default:
              return null;
          }
        })()}
        <Divider />
        <TimeText variant='subtitle_02' $disabled={disabled}>
          {moment(match.time, "HH:mm:ss").format("HH:mm")}
        </TimeText>
      </TextContainer>
    </DoubleHeaderItemContainer>
  );
};

const DoubleHeaderItemContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 16px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  .radio {
    width: 18px;
    height: 18px;
    & + img {
      width: 18px;
      height: 18px;
    }
  }
`;

const TextContainer = styled.div<{ $disabled?: boolean }>`
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

const TimeText = styled(Text)<{ $disabled?: boolean }>``;

export default DoubleHeaderItem;
