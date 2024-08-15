import styled from "styled-components";
import { typography } from "@/style/typography";
import ModalPortal from "./ModalPortal";

interface PopupProps {
  title: string;
  message: string;
  closePopup: () => void;
  type: "confirm" | "alert";
  confirmMessage?: string;
  confirmFunc?: () => void;
}

const Popup = ({
  title,
  message,
  closePopup,
  type,
  confirmMessage,
  confirmFunc,
}: PopupProps) => {
  const renderButtons = () => {
    switch (type) {
      case "confirm":
        return (
          <>
            <button
              type='button'
              className='cancel-button'
              onClick={closePopup}>
              취소
            </button>
            <button
              type='button'
              className='confirm-button'
              onClick={() => {
                confirmFunc?.();
                closePopup();
              }}>
              {confirmMessage}
            </button>
          </>
        );
      case "alert":
        return (
          <button
            type='button'
            className='confirm-button'
            onClick={() => {
              confirmFunc?.();
              closePopup();
            }}>
            확인
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <ModalPortal>
      <PopupWrapper onClick={closePopup}>
        <PopupContainer onClick={(e) => e.stopPropagation()}>
          <h1 className='title'>{title}</h1>
          <p className='message'>{message}</p>
          <ButtonGroup>{renderButtons()}</ButtonGroup>
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

  .title {
    ${typography.headline}
  }
  .message {
    margin-top: 8px;
    ${typography.body_long_02}
  }
`;

const PopupContainer = styled.div`
  width: 354px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const ButtonGroup = styled.div`
  margin-top: 24px;
  gap: 12px;
  display: flex;
  width: 100%;
  button {
    width: 151px;
    height: 48px;
    ${typography.title_02}
    border-radius: 8px;
    width: 100%;
  }
  .cancel-button {
    opacity: 0.4;
    border: 1px solid var(--primary-color);
  }
  .confirm-button {
    background: var(--primary-color);
    color: white;
  }
`;

export default Popup;
