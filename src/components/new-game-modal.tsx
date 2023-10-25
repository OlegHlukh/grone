import { FC } from 'react';
import Modal from './ui/modal.tsx';
import { NewGameForm } from './new-game-form.tsx';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewGameModal: FC<NewGameModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <NewGameForm />
    </Modal>
  );
};
