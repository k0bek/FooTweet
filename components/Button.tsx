import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonPickedAttrs = "type" | "disabled" | "className" | "onClick";

interface ButtonProps extends Pick<ButtonAttrs, ButtonPickedAttrs> {
	children: ReactNode;
	className: string;
	onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
	return (
		<button
			className={classNames(
				{
					"bg-sky-500 text-white font-bold p-2 hover:opacity-90 transition-all rounded-full":
						true,
				},
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
