interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: React.ReactNode;
  variant?: "default" | "disabled" | "error";
  styletype?: "default" | "outline" | "text";
  size?: "small" | "big";
  disabled?: boolean;
}
declare const Button: ({
  children,
  variant,
  size,
  disabled,
  styletype,
  ...props
}: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
