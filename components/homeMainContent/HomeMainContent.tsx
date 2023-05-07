import React from "react";
import CreatePostBar from "./CreatePostBar";

interface HomeMainContentPage {
	children: React.ReactNode;
}

const HomeMainContent = ({ children }: HomeMainContentPage) => {
	return (
		<div className=" bg-gray-800 h-full w-full md:w-3/5">
			<div className=" border-down border-b-2 border-gray-700">
				<h1 className="text-white font-medium text-4xl p-10 ">Home</h1>
			</div>
			<div className="flex justify-center p-12">
				<CreatePostBar />
			</div>
		</div>
	);
};

export default HomeMainContent;
