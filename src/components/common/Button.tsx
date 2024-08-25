import styled from "styled-components";
import { button, buttonSize } from "@/style/button";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: React.ReactNode;
  variant?: "default" | "disabled" | "error";
  styletype?: "default" | "outline" | "text";
  size?: "small" | "big";
  disabled?: boolean;
}

const Button = ({
  children,
  variant,
  size = "small",
  disabled,
  styletype,
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer
      disabled={disabled}
      size={size}
      styletype={styletype}
      variant={variant}
      {...props}>
      {children}
    </ButtonContainer>
  );
};
const ButtonContainer = styled.button<
  Pick<ButtonProps, "variant" | "size" | "styletype">
>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  ${({ size }) => size && buttonSize[size]}
  ${({ variant, styletype, disabled }) =>
    disabled
      ? button.disabled[styletype || "default"]
      : button[variant || "default"][styletype || "default"]}
`;

export default Button;
