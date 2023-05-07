import React from "react";
import UsersToFollowItem from "./UsersToFollowItem";

const UsersToFollow = () => {
	return (
		<div className="bg-gray-800 py-6 h-82 rounded-2xl  hidden xl:block">
			<h2 className="text-white font-bold text-3xl px-4">Who to follow</h2>
			<ul className="py-5 flex flex-col">
				<UsersToFollowItem />
				<UsersToFollowItem />
				<UsersToFollowItem />
			</ul>
			<p className="text-blue-500 cursor-pointer mt-1 px-4 text-2xl">
				Show more
			</p>
		</div>
	);
};

export default UsersToFollow;
