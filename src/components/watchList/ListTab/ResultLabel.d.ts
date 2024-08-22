import React from "react";
import { MyGame } from "@/types/Game";
interface ResultLabelProps {
    status: Pick<MyGame, "status">["status"];
    children: React.ReactNode;
}
declare const ResultLabel: ({ status, children }: ResultLabelProps) => import("react/jsx-runtime").JSX.Element;
export default ResultLabel;
