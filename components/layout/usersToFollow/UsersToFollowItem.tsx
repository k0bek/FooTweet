import Image from "next/image";
import React from "react";
import lewy from "./../../../assets/images/lewy.jpg";

import Button from "@/components/Button";

const UsersToFollowItem = () => {
	return (
		<li className="flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-all w-full px-4 py-4 gap-8">
			<div className="flex gap-4 items-center justify-center">
				<Image
					src={lewy}
					width={50}
					height={40}
					alt="User's profile image"
					className="rounded-full"
				/>
				<div className="flex flex-col justify-center">
					<p className="text-white font-medium text-3xl">Kubusieg</p>
					<span className=" text-gray-500 text-xl">@kubusieg</span>
				</div>
			</div>
			<Button
				variant="rectangle"
				className="hidden md:block w-28 text-xl font-semibold"
			>
				Follow
			</Button>
		</li>
	);
};

export default UsersToFollowItem;
