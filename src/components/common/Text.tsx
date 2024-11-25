import React from "react";
import styled from "styled-components";
import { typography } from "@/style/typography";

type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "as"> {
  as?: Extract<React.ElementType, TextTags>;
  variant?: keyof typeof typography;
  color?: string;
  children: React.ReactNode;
}

const Text = ({
  variant = "body_01",
  as = "span",
  color,
  children,
}: TextProps) => {
  return (
    <TextComponent as={as} variant={variant} color={color}>
      {children}
    </TextComponent>
  );
};

const TextComponent = styled.span<{
  variant: keyof typeof typography;
  color?: string;
}>`
  ${({ variant }) => typography[variant]}
  color: ${({ color }) => color || "inherit"};
`;

export default Text;
