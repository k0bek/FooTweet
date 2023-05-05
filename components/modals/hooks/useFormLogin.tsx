import { useForm } from "react-hook-form";

export const useFormLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onTouched",
		criteriaMode: "all",
	});

	const onSubmit = async () => {
		const { email, password } = getValues();

		console.log(email);
	};

	return { onSubmit, register, handleSubmit, errors };
};
