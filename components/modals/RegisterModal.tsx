import Modal from "./Modal";
import Button from "../Button";
import FormInput from "../FormInput";

export default function RegisterModal() {
	return (
		<>
			<h1 className="font-bold text-5xl text-white mb-10">Register</h1>
			<label className="font-medium">Email address</label>
			<FormInput placeholder="Email address" />
			{/* <p>{errors.email?.message}</p> */}

			<label className="font-medium">Password</label>
			<FormInput placeholder="Password" />

			<label className="font-medium">Repeat password</label>
			<FormInput placeholder="Repeat password" />

			<Button className="mt-8 py-4 text-2xl ">Submit</Button>
		</>
	);
}
