import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

interface ModalProps {
	isLoginForm: boolean;
	isModalVisible: boolean;
	changeFormHandler: () => void;
	changeModalVisibilityHandler: () => void;
}

const Modal = ({
	isLoginForm,
	changeFormHandler,
	changeModalVisibilityHandler,
}: ModalProps) => {
	return (
		<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col items-center justify-center z-10 px-5">
			{isLoginForm ? (
				<LoginModal
					changeFormHandler={changeFormHandler}
					changeModalVisibilityHandler={changeModalVisibilityHandler}
				/>
			) : (
				<RegisterModal
					changeFormHandler={changeFormHandler}
					changeModalVisibilityHandler={changeModalVisibilityHandler}
				/>
			)}
		</div>
	);
};

export default Modal;
