import { ReactNode } from "react";
export declare const state: {
    themeName: string;
};
export declare const ThemeContext: import("react").Context<{
    themeName: string;
}>;
export declare const ThemeContextProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
