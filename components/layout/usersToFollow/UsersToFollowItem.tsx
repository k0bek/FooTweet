import Image from "next/image";
import React from "react";
import lewy from "./../../../public/images/lewy.jpg";
import Button from "@/components/Button";

const UsersToFollowItem = () => {
	return (
		<li className="flex justify-between cursor-pointer hover:bg-gray-700 transition-all w-full px-4 py-4">
			<div className="flex gap-4">
				<Image
					src={lewy}
					width={50}
					height={40}
					alt="User's profile image"
					className="rounded-full"
				/>
				<div>
					<p className="text-white font-medium text-lg">Kubusieg</p>
					<span className=" text-gray-500 text-base">@kubusieg</span>
				</div>
			</div>
			<Button variant="rounded" className="text-sm bg-white text-black w-24">
				Follow
			</Button>
		</li>
	);
};

export default UsersToFollowItem;
