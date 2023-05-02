import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonPickedAttrs = "type" | "disabled" | "className" | "onClick";

interface ButtonProps extends Pick<ButtonAttrs, ButtonPickedAttrs> {
	children: ReactNode;
	variant: string;
	className: string;
}

const Button = ({ children, variant, className }: ButtonProps) => {
	return (
		<button
			className={classNames(
				{
					"bg-sky-500 text-white font-bold p-2 hover:opacity-90 transition-all rounded-full":
						true,
					"text-3xl": variant === "rounded",
					"w-40 text-xl": variant === "rectangle",
				},
				className
			)}
		>
			{children}
		</button>
	);
};

export default Button;
