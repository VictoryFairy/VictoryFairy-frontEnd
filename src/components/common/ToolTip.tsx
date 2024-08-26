import { useState } from "react";
import styled from "styled-components";

export const Tooltip = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      <TooltipText visible={visible}>{text}</TooltipText>
    </TooltipWrapper>
  );
};

const TooltipText = styled.div<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transition: opacity 0.3s;
  white-space: nowrap;
  z-index: 1;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
