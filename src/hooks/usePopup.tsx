import { useCallback, useState } from "react";
import Popup from "../components/modal/Popup";

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const PopupComponent = useCallback(
    ({
      title,
      message,
      type,
      confirmMessage,
      confirmFunc,
      comp,
    }: {
      title: string;
      message: string;
      type: "confirm" | "alert" | "test";
      confirmMessage?: string;
      confirmFunc?: () => void;
      comp?: React.ReactNode;
    }) => (
      <Popup
        title={title}
        message={message}
        closePopup={closePopup}
        type={type as "confirm" | "alert" | "test"}
        confirmMessage={confirmMessage}
        confirmFunc={confirmFunc}
        comp={comp}
      />
    ),
    [closePopup],
  );

  return {
    Popup: PopupComponent,
    openPopup,
    isOpen,
  };
};
