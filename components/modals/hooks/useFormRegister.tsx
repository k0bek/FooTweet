import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useFormRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isModalClosed, setIsModalClosed] = useState(false);

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

		const createUser = async () => {
			setIsLoading(true);
			const response = await fetch("api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.field, {
					type: "manual",
					message: errorData.message,
				});
				setIsLoading(false);
				return;
			} else {
				setIsModalClosed(true);
				toast.success("Successfully registered!");
			}

			await signIn("credentials", {
				redirect: false,
				email,
				password,
			});
			setIsLoading(false);
		};

		createUser();
	};

	return {
		onSubmit,
		register,
		handleSubmit,
		errors,
		getValues,
		setError,
		isLoading,
		isModalClosed,
	};
};
