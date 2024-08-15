import React from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  FieldError,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

interface TextAreaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  maxLength?: number;
}

const TextAreaField = ({
  name,
  label,
  placeholder,
  maxLength,
  register,
  watch,
  setValue,
  error,
  disabled,
  rows = 2,
  ...textareaProps
}: TextAreaFieldProps) => {
  const data = watch(name) as string;

  const currentLength = data ? data.length : 0;

  return (
    <InputContainer>
      <div className='labelWrapper'>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {maxLength && (
          <CharCount>
            {currentLength}/{maxLength}
          </CharCount>
        )}
      </div>
      <InputWrapper>
        <StyledTextArea
          id={name}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          {...register(name)}
          {...textareaProps}
        />
      </InputWrapper>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-bottom: 16px;
  position: relative;
  width: 100%;

  .labelWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  background-color: ${(prop) => (prop.disabled ? "var(--gray-50)" : "white")};
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #666;
`;

export default TextAreaField;
