import React from "react";
import styled from "styled-components";
import { MyGame } from "@/types/Game";
import { typography } from "../../style/typography";

interface ResultLabelProps {
  status: Pick<MyGame, "status">["status"];
  children: React.ReactNode;
}

const ResultLabel = ({ status, children }: ResultLabelProps) => {
  return (
    <ResultLabelContainer status={status}>{children}</ResultLabelContainer>
  );
};
const ResultLabelContainer = styled.span<{ status: string }>`
  ${typography.subtitle_01}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  height: 24px;
  min-width: 66px;
  white-space: nowrap;

  color: ${({ status }) =>
    status === "Tie" || status === "No game" ? "var(--black)" : "var(--white)"};

  background-color: ${({ status, theme }) => {
    switch (status) {
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

export default ResultLabel;
