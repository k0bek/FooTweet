import { useForm } from "react-hook-form";

export const useFormRegister = () => {
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
			repeatPassword: "",
		},
		mode: "onTouched",
		criteriaMode: "all",
	});

	const onSubmit = async () => {
		const { email, password, repeatPassword } = getValues();
	};

	return { onSubmit, register, handleSubmit, errors, getValues, setError };
};
