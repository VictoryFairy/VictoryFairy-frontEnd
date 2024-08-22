import React from "react";
import { typography } from "@/style/typography";
type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "as"> {
    as?: Extract<React.ElementType, TextTags>;
    variant?: keyof typeof typography;
    color?: string;
    children: React.ReactNode;
}
declare const Text: ({ variant, as, color, children, }: TextProps) => import("react/jsx-runtime").JSX.Element;
export default Text;
