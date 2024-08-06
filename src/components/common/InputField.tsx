import { useState } from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  FieldError,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

const InputContainer = styled.div`
  margin-bottom: 16px;
  position: relative;
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

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 4px;
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #666;
`;

const VisibilityToggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #999;
  &:hover {
    color: #666;
  }
`;

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  maxLength,
  register,
  watch,
  setValue,
  error,
}: InputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputType = type === "password" && isVisible ? "text" : type;
  const value = watch(name) as string;
  const currentLength = value ? value.length : 0;

  const clearInput = () => {
    setValue(name, "");
  };

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
        <StyledInput
          id={name}
          type={inputType}
          placeholder={placeholder}
          hasError={!!error}
          {...register(name)}
        />
        {value && type !== "password" && (
          <ClearButton type='button' onClick={clearInput}>
            ×
          </ClearButton>
        )}
        {type === "password" && (
          <VisibilityToggle type='button' onClick={toggleVisibility}>
            {isVisible ? "👁️" : "👁️‍🗨️"}
          </VisibilityToggle>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputContainer>
  );
};

export default InputField;
