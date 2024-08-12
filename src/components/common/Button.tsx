import styled from "styled-components";
import { button, buttonSize } from "../../style/button";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: React.ReactNode;
  variant?: "default" | "disabled" | "error";
  styleType?: "default" | "outline" | "text";
  size?: "small" | "big";
  disabled?: boolean;
}

const Button = ({
  children,
  variant,
  size = "small",
  disabled,
  styleType,
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer
      disabled={disabled}
      size={size}
      styleType={styleType}
      variant={variant}
      {...props}>
      {children}
    </ButtonContainer>
  );
};
const ButtonContainer = styled.button<
  Pick<ButtonProps, "variant" | "size" | "styleType">
>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
  ${({ size }) => size && buttonSize[size]}
  ${({ variant, styleType, disabled }) =>
    disabled
      ? button.disabled[styleType || "default"]
      : button[variant || "default"][styleType || "default"]}
`;

export default Button;
