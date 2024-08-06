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
    }: {
      title: string;
      message: string;
      type: "confirm" | "alert";
    }) => (
      <Popup
        title={title}
        message={message}
        closePopup={closePopup}
        type={type as "confirm" | "alert"}
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
