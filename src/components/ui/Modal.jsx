// src/components/ui/Modal.js
import Button from './Button';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        {children}
        <Button onClick={onClose} className="modal-close-button">Close</Button>
      </div>
    </div>
  );
};

export default Modal;