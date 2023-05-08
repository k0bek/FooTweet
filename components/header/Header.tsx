import React from "react";

interface HeaderProps {
	children: React.ReactNode;
	heading: string;
}

const Header = ({ children, heading }: HeaderProps) => {
	return (
		<div className=" bg-gray-800 h-full w-full md:w-3/5">
			<div className=" border-down border-b-2 border-gray-700">
				<h1 className="text-white font-medium text-4xl p-10 ">{heading}</h1>
			</div>
			<div className="flex justify-center p-12">{children}</div>
		</div>
	);
};

export default Header;
