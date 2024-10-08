import { useState } from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  FieldError,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { typography } from "@/style/typography";
import Icon from "./Icon";

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string; // name은 필수이므로 여전히 명시적으로 선언
  label: string;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  maxLength?: number;
  clearable?: boolean;
  hasLabel?: boolean;
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
  clearable = true,
  hasLabel = true,
  error,
  ...inputProps
}: InputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputType = type === "password" && isVisible ? "text" : type;
  const data = watch(name) as string;
  const currentLength = data ? data.length : 0;

  const clearInput = () => setValue(name, "");

  const renderClearButton = () => {
    if (data && type !== "password" && clearable) {
      return (
        <ClearButton type='button' onClick={clearInput}>
          ×
        </ClearButton>
      );
    }
    return null;
  };

  const renderVisibilityToggle = () => {
    if (type === "password") {
      return (
        <VisibilityToggle type='button' onClick={toggleVisibility}>
          {isVisible ? <Icon icon='IcHide' /> : <Icon icon='IcShow' />}
        </VisibilityToggle>
      );
    }
    return null;
  };

  return (
    <InputContainer>
      <div className='labelWrapper'>
        {hasLabel && <InputLabel htmlFor={name}>{label}</InputLabel>}
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
          $hasError={!!error}
          maxLength={maxLength}
          {...register(name)}
          {...inputProps}
        />
        {renderClearButton()}
        {renderVisibilityToggle()}
      </InputWrapper>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
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
  ${typography.caption}
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 0px;
  outline: none;
  border: none;
  border-bottom: none;
  box-shadow: inset 0 -1px 0 0 ${(props) => (props.$hasError ? "red" : "#ccc")};
  ${typography.body_02};
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
export default InputField;
