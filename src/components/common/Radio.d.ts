import React from "react";
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const Radio: ({ label, checked, onChange, ...props }: RadioProps) => import("react/jsx-runtime").JSX.Element;
export default Radio;
