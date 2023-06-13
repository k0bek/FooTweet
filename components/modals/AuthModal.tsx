import React from 'react';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface ModalProps {
  isLoginForm: boolean;
  changeFormHandler: () => void;
}

const Modal = ({ isLoginForm, changeFormHandler }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col items-center justify-center z-10 px-5 overflow-hidden">
      {isLoginForm ? (
        <LoginModal changeFormHandler={changeFormHandler} />
      ) : (
        <RegisterModal changeFormHandler={changeFormHandler} />
      )}
    </div>
  );
};

export default Modal;
