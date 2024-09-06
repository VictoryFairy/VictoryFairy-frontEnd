import styled from "styled-components";
import { typography } from "@/style/typography";
import ModalPortal from "../modal/ModalPortal";

interface PopupProps {
  title: string;
  message: string;
  closePopup: () => void;
  confirmMessage?: string;
  confirmFunc?: () => void;
  comp: React.ReactNode;
  active: boolean;
}

const WithDrawPopup = ({
  title,
  message,
  closePopup,
  confirmMessage,
  confirmFunc,
  comp,
  active,
}: PopupProps) => {
  return (
    <ModalPortal>
      <PopupWrapper>
        <PopupContainer onClick={(e) => e.stopPropagation()}>
          <h1 className='title'>{title}</h1>
          <p
            className='message'
            dangerouslySetInnerHTML={{ __html: message }}
          />
          <ButtonGroup>
            <div className='test-wrapper'>
              {comp}
              <div className='button-wrapper'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={closePopup}>
                  취소
                </button>
                <button
                  type='button'
                  className='confirm'
                  disabled={!active}
                  onClick={() => {
                    confirmFunc?.();
                    closePopup();
                  }}
                  style={{
                    backgroundColor: active
                      ? "var(--primary-color)"
                      : "var(--gray-50)",
                    color: active ? "var(--white)" : "var(--gray-400)",
                  }}>
                  {confirmMessage}
                </button>
              </div>
            </div>
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

  .title {
    ${typography.headline}
  }
  .message {
    margin-top: 8px;
    ${typography.body_long_02}
    color: var(--primary-color);
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
  border-radius: 12px;
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
    cursor: pointer;
  }
  .cancel-button {
    opacity: 0.4;
    border: 1px solid var(--primary-color);
  }
  .confirm-button {
    background: var(--primary-color);
    color: white;
  }

  .test-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .button-wrapper {
    display: flex;
    margin-top: 20px;
    :nth-child(1) {
      margin-right: 10px;
    }
  }
`;

export default WithDrawPopup;
