import Button from '../FormElements/Button';
import Modal from './Modal';

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