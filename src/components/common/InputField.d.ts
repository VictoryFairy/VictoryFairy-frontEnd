import { UseFormRegister, FieldError, UseFormWatch, UseFormSetValue } from "react-hook-form";
interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
    error?: FieldError;
    maxLength?: number;
}
declare const InputField: ({ name, label, type, placeholder, maxLength, register, watch, setValue, error, ...inputProps }: InputFieldProps) => import("react/jsx-runtime").JSX.Element;
export default InputField;
