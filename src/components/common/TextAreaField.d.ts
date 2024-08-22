import React from "react";
import { UseFormRegister, FieldError, UseFormWatch, UseFormSetValue } from "react-hook-form";
interface TextAreaFieldProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
    error?: FieldError;
    maxLength?: number;
}
declare const TextAreaField: ({ name, label, placeholder, maxLength, register, watch, setValue, error, disabled, rows, ...textareaProps }: TextAreaFieldProps) => import("react/jsx-runtime").JSX.Element;
export default TextAreaField;
