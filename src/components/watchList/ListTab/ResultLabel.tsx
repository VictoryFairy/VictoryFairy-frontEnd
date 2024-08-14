import React from "react";
import styled from "styled-components";
import { typography } from "../../../style/typography";

interface ResultLabelProps {
  status: "WIN" | "Lose" | "Tie" | "No game";
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
  width: 66px;
  white-space: nowrap;

  color: ${({ status }) =>
    status === "Tie" || status === "No game" ? "var(--black)" : "var(--white)"};

  background-color: ${({ status, theme }) => {
    switch (status) {
      case "WIN":
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
