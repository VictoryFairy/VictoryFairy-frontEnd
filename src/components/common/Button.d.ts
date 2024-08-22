interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
    children: React.ReactNode;
    variant?: "default" | "disabled" | "error";
    styleType?: "default" | "outline" | "text";
    size?: "small" | "big";
    disabled?: boolean;
}
declare const Button: ({ children, variant, size, disabled, styleType, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
