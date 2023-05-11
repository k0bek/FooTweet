import React from "react";

interface HeaderProps {
	heading: string;
}

const Header = ({ heading }: HeaderProps) => {
	return (
		<div className="border-down border-b-2 border-gray-700 w-full">
			<h1 className="text-white font-medium text-4xl p-10 ">{heading}</h1>
		</div>
	);
};

export default Header;
