import React from "react";
import styled from "styled-components";
import { typography } from "../../style/typography";

type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "as"> {
  as?: Extract<React.ElementType, TextTags>;
  variant?: keyof typeof typography;
  children: React.ReactNode;
}

const Text = ({ variant = "body_01", as = "span", children }: TextProps) => {
  return (
    <TextComponent as={as} variant={variant}>
      {children}
    </TextComponent>
  );
};

const TextComponent = styled.span<{ variant: keyof typeof typography }>`
  ${({ variant }) => typography[variant]}
`;

export default Text;
