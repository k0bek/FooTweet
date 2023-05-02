import React from "react";
import UsersToFollowItem from "./UsersToFollowItem";

const UsersToFollow = () => {
	return (
		<div className="bg-gray-800 py-4 h-82 w-80 rounded-lg mr-10 hidden xl:block">
			<h2 className="text-white font-bold text-xl px-4">Who to follow</h2>
			<ul className=" py-5 flex flex-col">
				<UsersToFollowItem />
				<UsersToFollowItem />
				<UsersToFollowItem />
			</ul>
			<p className="text-blue-500 cursor-pointer mt-1 px-4">Show more</p>
		</div>
	);
};

export default UsersToFollow;
