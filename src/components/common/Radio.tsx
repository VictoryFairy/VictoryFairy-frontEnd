import React from "react";
import styled from "styled-components";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ label, checked, onChange, ...props }: RadioProps) => {
  return (
    <Label>
      <RadioInput
        type='radio'
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <CustomRadio checked={checked} />
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

const CustomRadio = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ checked, theme }) =>
    checked ? `${theme.colors.primary}` : "#fff"};
  transition: background-color 0.3s;
  border: ${({ checked }) =>
    checked ? "1px solid transparent" : "1px solid #2f3036"};

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
  `}
`;

const LabelText = styled.span`
  font-size: 16px;
`;

export default Radio;
