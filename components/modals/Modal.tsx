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
		<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-10 px-5">
			<form className="flex flex-col gap-3 bg-black py-20 px-10 rounded-2xl w-[50rem] relative">
				{isLoginForm ? <LoginModal /> : <RegisterModal />}
				<button>
					<AiOutlineClose
						className="text-white absolute text-4xl right-10 top-[5.4rem] hover:bg-gray-500 hover:rounded-full p-1 transition-all"
						onClick={changeModalVisibilityHandler}
					/>
				</button>

				<p className="text-gray-300 text-[1.5rem] text-center mt-2">
					{isLoginForm ? "Dont have an account?" : "Already have an account?"}
					<span
						className="text-white font-semibold cursor-pointer ml-2"
						onClick={changeFormHandler}
					>
						{isLoginForm ? "Register" : "Login "}
					</span>
				</p>
			</form>
		</div>
	);
};

export default Modal;
