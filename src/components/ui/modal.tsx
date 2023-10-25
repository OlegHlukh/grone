import { FC, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Root onClick={handleOverlayClick}>{children}</Root>
    </Overlay>,
    document.getElementById('modal') as HTMLDivElement,
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

const Root = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  z-index: 1;
  background-color: #fff;
  border-radius: 1px;
`;
