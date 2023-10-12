import React from 'react';
import "./modal.scss"
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
    {isOpen ?(
      <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
    ):<p></p>}
   </>
  );
};

export default Modal;
