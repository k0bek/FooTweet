import React from "react";
import CreatePostBar from "./CreatePostBar";
import Header from "../header/Header";
import Post from "../post/Post";

const HomeMainContent = ({ posts }) => {
	return (
		<div className="bg-gray-800 w-full md:w-3/5 ml-24 md:ml-0 xl:ml-[-13rem]">
			<Header heading="Home" />
			<div className="flex flex-col items-center gap-5 justify-center p-12">
				<CreatePostBar />
				{posts &&
					posts.map((post) => {
						return (
							<Post
								username={post.username}
								postValue={post.postValue}
								id={post._id}
							/>
						);
					})}
				{/* {isLoading && <Loader />} */}
			</div>
		</div>
	);
};

export default HomeMainContent;
