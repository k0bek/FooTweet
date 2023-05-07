import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { AiOutlineClose } from "react-icons/ai";

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
			<button>
				<AiOutlineClose
					className="text-white absolute text-4xl right-10 top-[5.4rem] hover:bg-gray-500 hover:rounded-full p-1 transition-all"
					onClick={changeModalVisibilityHandler}
				/>
			</button>

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
