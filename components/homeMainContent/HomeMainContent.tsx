import React from "react";
import CreatePostBar from "./CreatePostBar";
import Header from "../header/Header";
import Post from "../post/Post";
import { useQuery } from "react-query";
import Loader from "../loader/Loader";
import axios from "axios";

const HomeMainContent = () => {
	const {
		status,
		data: posts,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axios.get("/api/posts");
			return res.data;
		},
	});

	console.log(posts);

	return (
		<div className=" bg-gray-800 h-full w-full md:w-3/5">
			<Header heading="Home" />
			<div className="flex flex-col items-center gap-5 justify-center p-12">
				<CreatePostBar refetch={refetch} />
				{posts &&
					posts.map((post) => {
						return <Post username={post.username} postValue={post.postValue} />;
					})}
				{isLoading && <Loader />}
			</div>
		</div>
	);
};

export default HomeMainContent;
