import React from "react";
import lewy from "./../../assets/images/lewy.jpg";
import Image from "next/image";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

const Post = () => {
	return (
		<div className="flex items-center flex-col bg-slate-700 rounded-2xl w-full p-7">
			<div className="h-full w-full flex flex-col items-center gap-4 sm:flex-row">
				<div className="flex items-start gap-3">
					<Image
						src={lewy}
						width={50}
						height={50}
						alt="User's profile image"
						className="rounded-full"
					/>
					<div className="flex flex-col gap-2">
						<div className="flex items-center">
							<div className="flex flex-col">
								<div className="flex items-start flex-col sm:flex-row sm:items-end sm:gap-2">
									<span className="text-white font-semibold text-xl sm:text-2xl">
										Robert Lewandowski
									</span>
									<span className=" text-gray-400 font-medium sm:text-xl">
										@lewandowski
									</span>
								</div>
								<span className="text-gray-400 sm:text-xl">
									Few minutes ago
								</span>
							</div>
						</div>

						<p className="text-white text-lg sm:text-2xl">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
							iure facere provident doloremque corrupti dicta adipisci, nemo
							tempore ipsa mollitia autem quam dignissimos pariatur fuga?
							Voluptas eaque eum enim dolorem!
						</p>
					</div>
				</div>
			</div>
			<div></div>
			<div className="mt-5 flex gap-1 sm:gap-5 w-full justify-center">
				<button className="border border-gray-600 text-xs sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-red-500 transition-all">
					<AiFillHeart />
					Like
				</button>
				<button className="border border-gray-600 text-xs sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-blue-500 transition-all">
					<AiOutlineRetweet />
					Retweet
				</button>
				<button className="border border-gray-600 text-xs sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-zinc-500 transition-all">
					<FaComments />
					Comment
				</button>
			</div>
		</div>
	);
};

export default Post;
