export declare const usePopup: () => {
    Popup: ({ title, message, type, confirmMessage, confirmFunc, comp, TF, }: {
        title: string;
        message: string;
        type: "confirm" | "alert" | "test";
        confirmMessage?: string;
        confirmFunc?: () => void;
        comp?: React.ReactNode;
        TF?: boolean;
    }) => import("react/jsx-runtime").JSX.Element;
    openPopup: () => void;
    isOpen: boolean;
};
