import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

interface ErrorModalProps {
    onClear: () => void,
    error: string | null
}

const ErrorModal = ({onClear, error}: ErrorModalProps) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;