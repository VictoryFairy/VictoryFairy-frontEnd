import { useState } from "react";
import styled from "styled-components";

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {children}
      <TooltipText visible={visible}>{text}</TooltipText>
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TooltipText = styled.div<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  width: 200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 10;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transition:
    opacity 0.3s,
    visibility 0.3s;

  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export default Tooltip;
