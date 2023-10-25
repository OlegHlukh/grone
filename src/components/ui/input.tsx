import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = forwardRef(
  (
    { label, error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    return (
      <InputWrapper>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input id={id} ref={ref} {...rest} />
        {error && <p>{error}</p>}
      </InputWrapper>
    );
  },
);

export default TextInput;

const InputWrapper = styled.div`
  display: grid;
  gap: 10px;

  p {
    padding: 0;
    color: red;
    font-size: 14px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  opacity: 0.6;
  padding: 0;
`;

const Input = styled.input`
  border-radius: 0;
  padding: 5px;
  border: 1px solid black;
  font-size: 18px;

  ::placeholder {
    font-size: 16px;
  }

  &:focus,
  &:active {
    outline: none;
  }
`;
