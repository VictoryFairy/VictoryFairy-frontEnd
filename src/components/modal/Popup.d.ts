interface PopupProps {
    title: string;
    message: string;
    closePopup: () => void;
    type: "confirm" | "alert" | "test";
    confirmMessage?: string;
    confirmFunc?: () => void;
    comp?: React.ReactNode;
    TF?: boolean;
}
declare const Popup: ({ title, message, closePopup, type, confirmMessage, confirmFunc, comp, TF, }: PopupProps) => import("react/jsx-runtime").JSX.Element;
export default Popup;
