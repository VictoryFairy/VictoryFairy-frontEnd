import styled from "styled-components";
import { Game } from "@/types/Game";
import Text from "./Text";

interface ResultLabelProps {
  result: string | null;
  status: Pick<Game, "status">["status"];
}

const ResultLabel = ({ result, status }: ResultLabelProps) => {
  return status === "경기전" || status === "경기중" || result === null ? (
    <DefaultLabel>
      <Text variant='subtitle_01'>???</Text>
    </DefaultLabel>
  ) : (
    <ResultLabelContainer result={result} status={status}>
      <Text variant='body_01'>{result}</Text>
    </ResultLabelContainer>
  );
};
const ResultLabelContainer = styled.span<{
  result: string | null;
  status: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  height: 24px;
  min-width: 66px;
  white-space: nowrap;

  color: ${({ result }) =>
    result === "Tie" || result === "No game" ? "var(--black)" : "var(--white)"};

  background-color: ${({ result, theme }) => {
    switch (result) {
      case "Win":
        return theme.colors.primary;
      case "Lose":
        return theme.colors.secondary;
      case "Tie":
        return "var(--gray-200)";
      case "No game":
        return "var(--gray-200)";
      default:
    }
  }};
`;

const DefaultLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  height: 24px;
  min-width: 66px;
  white-space: nowrap;
  box-sizing: border-box;
  border: 1px dashed #2f3036;
  border-radius: 4px;
`;

export default ResultLabel;
