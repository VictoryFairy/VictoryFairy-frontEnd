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
    }: {
      title: string;
      message: string;
      type: "confirm" | "alert";
      confirmMessage: string;
      confirmFunc: () => void;
    }) => (
      <Popup
        title={title}
        message={message}
        closePopup={closePopup}
        type={type as "confirm" | "alert"}
        confirmMessage={confirmMessage}
        confirmFunc={confirmFunc}
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
