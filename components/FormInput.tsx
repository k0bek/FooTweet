interface FormInputProps {
	placeholder: string;
}

const FormInput = ({ placeholder }: FormInputProps) => {
	return (
		<input
			className="
    p-4 
    text-xl 
    bg-black 
    border-2
    border-neutral-800 
    rounded-md
    outline-none
    text-white
    focus:border-sky-500
    focus:border-2
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    "
			placeholder={placeholder}
		/>
	);
};

export default FormInput;
