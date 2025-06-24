import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import Text from "../common/Text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: "cancel" | "confirm";
  color?: string;
}

export interface PopupProps {
  title: string;
  message: string;
  buttons: ButtonProps[];
}

const Popup = ({ title, message, buttons }: PopupProps) => {
  return (
    <ModalPortal>
      <PopupWrapper>
        <PopupContainer onClick={(e) => e.stopPropagation()}>
          <Text variant='headline' as='h1'>
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Text>
          <Text variant='body_long_02' as='p'>
            {message.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Text>
          <ButtonGroup>
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                <Text variant='body_02'>{button.label}</Text>
              </Button>
            ))}
          </ButtonGroup>
        </PopupContainer>
      </PopupWrapper>
    </ModalPortal>
  );
};

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
  width: 354px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  margin-top: 24px;
  gap: 12px;
  display: flex;
  width: 100%;
`;

const Button = styled.button<{ variant: "cancel" | "confirm" }>`
  ${({ variant, color }) =>
    variant === "cancel"
      ? `
    opacity: 0.4;
    border: 1px solid var(--primary-color);
    color: ${color || "var(--primary-color)"};
  `
      : `
    background: var(--primary-color);
    color: ${color || "white"};
  `}

  width: 151px;
  height: 48px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`;

export default Popup;
