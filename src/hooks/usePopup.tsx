import { useState, useCallback } from "react";
import Popup, { PopupProps } from "@/components/modal/Popup";

// 팝업 훅 정의
export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps | null>(null);

  // 팝업 열기 함수
  const openPopup = useCallback((props: PopupProps) => {
    setPopupProps(props);
    setIsOpen(true);
  }, []);

  // 팝업 닫기 함수
  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 팝업 렌더 함수
  const renderPopup = () => {
    if (!isOpen || !popupProps) return null;
    return <Popup {...popupProps} />;
  };

  return {
    openPopup,
    closePopup,
    renderPopup,
  };
};
