import React from "react";
import lewy from "./../../assets/images/lewy.jpg";
import Image from "next/image";
import { BsFillImageFill } from "react-icons/bs";

const CreatePostBar = () => {
	return (
		<div className="flex items-center flex-col bg-slate-700 rounded-2xl w-full p-7">
			<div className="h-full w-full flex items-center gap-4 flex-col sm:flex-row">
				<Image
					src={lewy}
					width={67}
					height={60}
					alt="User's profile image"
					className="rounded-full"
				/>
				<textarea
					className="h-[5.5rem] rounded-2xl w-full bg-slate-500 text-xl p-4 text-white outline-none sm:text-4xl "
					placeholder="What's happening?"
				></textarea>
			</div>
			<div className="mt-5 flex gap-1 sm:gap-5 w-full justify-end">
				<button className="border border-gray-600 text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3">
					<BsFillImageFill className="text-emerald-400 shadow-xl shadow-emerald-500" />
					Photo
				</button>
				<button className="border border-gray-600 bg-sky-500 text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-bold flex items-center gap-3">
					Tweet
				</button>
			</div>
		</div>
	);
};

export default CreatePostBar;
