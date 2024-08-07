import React from "react";
import styled from "styled-components";

interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const getButtonStyles = (
  disabled: boolean,
  variant: "primary" | "secondary",
) => {
  if (disabled) {
    return {
      backgroundColor: "#E5E5E5",
      color: "#A0A0A0",
      cursor: "not-allowed",
    };
  }

  if (variant === "primary") {
    return {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      cursor: "pointer",
      hoverBackgroundColor: "#333333",
      activeBackgroundColor: "#666666",
    };
  }

  if (variant === "secondary") {
    return {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      cursor: "pointer",
      hoverBackgroundColor: "#DDDDDD",
      activeBackgroundColor: "#CCCCCC",
    };
  }

  return {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    cursor: "pointer",
    hoverBackgroundColor: "#333333",
    activeBackgroundColor: "#666666",
  };
};

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  border: none;
  cursor: ${(props) =>
    getButtonStyles(props.disabled ?? false, props.variant ?? "primary")
      .cursor};
  background-color: ${(props) =>
    getButtonStyles(props.disabled ?? false, props.variant ?? "primary")
      .backgroundColor};
  color: ${(props) =>
    getButtonStyles(props.disabled ?? false, props.variant ?? "primary").color};
  transition:
    background-color 0.3s,
    color 0.3s;

  &:active {
    background-color: ${(props) =>
      !props.disabled &&
      getButtonStyles(false, props.variant ?? "primary").activeBackgroundColor};
  }
`;

const Button = ({
  disabled,
  type,
  children,
  onClick,
  variant,
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
