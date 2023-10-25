import styled from 'styled-components';
import { FC } from 'react';

interface LoaderProps {
  color?: string;
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ color, size }) => {
  return <LoaderWrapper color={color} size={size} />;
};

const LoaderWrapper = styled.div<LoaderProps>`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  border: 10px solid #f3f3f3;
  border-top: 10px solid ${(props) => props.color ?? 'gray'};
  border-radius: 50%;
  width: ${(props) => (props.size ? `${props.size}px` : '80px')};
  height: ${(props) => (props.size ? `${props.size}px` : '80px')};
  animation: spin 1s linear infinite;
`;
