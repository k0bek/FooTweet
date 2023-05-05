import FormInput from "../FormInput";
import { regexEmail } from "@/constants/regexEmail";
import { useFormRegister } from "./hooks/useFormRegister";
import { useForm } from "react-hook-form";
import { type } from "os";

interface RegisterModalProps {
	changeFormHandler: () => void;
}

export default function RegisterModal({
	changeFormHandler,
}: RegisterModalProps) {
	const { handleSubmit, onSubmit, register, errors } = useFormRegister();
	const { watch } = useForm();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 bg-black py-20 px-10 rounded-2xl w-[50rem] relative"
		>
			<h1 className="font-bold text-5xl text-white mb-10">Register</h1>
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
				<p className="text-white">{errors.email.message}</p>
			)}

			<label className="font-medium">Password</label>
			<FormInput
				placeholder="Password"
				register={register("password", {
					required: "You need to enter your password.",
					minLength: {
						value: 7,
						message: "Your password is too short.",
					},
				})}
				type="password"
			/>
			{errors?.password?.message && (
				<p className="text-white">{errors?.password?.message}</p>
			)}

			<label className="font-medium">Repeat password</label>
			<FormInput
				placeholder="Repeat password"
				register={register("repeatPassword", {
					required: "You need to repeat your password.",
					validate: (val: string) => {
						if (watch("password") != val) {
							return "Your passwords do no match";
						}
					},
				})}
				type="password"
			/>

			{errors?.repeatPassword?.message && (
				<p className="text-white">{errors?.repeatPassword?.message}</p>
			)}

			<input
				className="mt-8 py-4 text-2xl rounded-full bg-sky-500 text-white font-bold cursor-pointer"
				name="Submit"
				type="submit"
				value="Submit"
			/>

			<p className="text-gray-300 text-[1.5rem] text-center mt-2">
				Already have an account?
				<span
					className="text-white font-semibold cursor-pointer ml-2"
					onClick={changeFormHandler}
				>
					Login
				</span>
			</p>
		</form>
	);
}
