import React from "react";
import styled from "styled-components";
import checkBoxUnchecked from "@/assets/images/checkbox-unchecked.png";
import checkBoxChecked from "@/assets/images/checkbox-checked.png";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
  variant: "circle" | "square";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Radio = ({
  label,
  checked,
  variant,
  onChange,
  disabled,
  ...props
}: RadioProps) => {
  return (
    <Label>
      <RadioInput
        type='radio'
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {(() => {
        switch (variant) {
          case "circle":
            return <CircleRadio checked={checked} disabled />;
          case "square":
            return checked ? (
              <img src={checkBoxChecked} alt='checkbox' />
            ) : (
              <img src={checkBoxUnchecked} alt='checkbox' />
            );
          default:
            return null;
        }
      })()}
      <LabelText>{label}</LabelText>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioInput = styled.input`
  display: none;
`;

const CircleRadio = styled.span<{ checked: boolean; disabled?: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ checked, theme }) =>
    checked ? `${theme.colors.primary}` : "#fff"};
  transition: background-color 0.3s;
  border: ${({ checked }) =>
    checked ? "1px solid transparent" : "1px solid #2f3036"};

  ${({ disabled }) =>
    disabled &&
    `
    background-color: var(--disabled-on);
    border: none;
     &:after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
      display: block;
      margin: 50%;
      transform: translate(-50%, -50%);
    }
  `}

  ${({ checked }) =>
    checked &&
    `
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
      display: block;
      margin: 50%;
      transform: translate(-50%, -50%);
    }
  `};
`;

const LabelText = styled.span`
  font-size: 16px;
`;

export default Radio;
