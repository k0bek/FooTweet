import { useFormLogin } from "./hooks/useFormLogin";
import FormInput from "../FormInput";
import { regexEmail } from "@/constants/regexEmail";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface LoginModalProps {
	changeFormHandler: () => void;
	changeModalVisibilityHandler: () => void;
}

export default function LoginModal({
	changeFormHandler,
	changeModalVisibilityHandler,
}: LoginModalProps) {
	const { handleSubmit, onSubmit, register, errors, isLoading, isModalClosed } =
		useFormLogin();

	useEffect(() => {
		changeModalVisibilityHandler();
	}, [isModalClosed]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 bg-black py-20 px-10 rounded-2xl w-[50rem] relative"
		>
			<div className="flex w-full items-center justify-between">
				<h1 className="font-bold text-5xl text-white ">Login</h1>
				<button>
					<AiOutlineClose
						className="text-white text-4xl  hover:bg-gray-500 hover:rounded-full p-1 transition-all"
						onClick={changeModalVisibilityHandler}
					/>
				</button>
			</div>
			<label className="font-medium">Email address</label>
			<FormInput
				placeholder="Email address"
				register={register("email", {
					required: "You need to enter your email.",
					pattern: {
						value: regexEmail,
						message: "This email is invalid.",
					},
				})}
				type="email"
			/>

			{errors?.email?.message && (
				<p className="text-white">{errors?.email?.message}</p>
			)}

			<label className="font-medium">Password</label>
			<FormInput
				placeholder="Password"
				register={register("password", {
					required: "You need to enter your password.",
				})}
				type="password"
			/>

			{errors?.password?.message && (
				<p className="text-white">{errors?.password?.message}</p>
			)}

			<input
				className={`mt-8 py-4 text-2xl rounded-full ${
					isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500"
				} text-white font-bold cursor-pointer`}
				name="Submit"
				type="submit"
				value="Submit"
				disabled={isLoading}
			/>
			<p className="text-gray-300 text-[1.5rem] text-center mt-2">
				Dont have an account?
				<button
					className={`text-white font-semibold cursor-pointer ml-2 ${
						isLoading ? "cursor-not-allowed" : ""
					}`}
					onClick={changeFormHandler}
					disabled={isLoading}
				>
					Register
				</button>
			</p>
		</form>
	);
}
