import React from "react";
import CreatePostBar from "./CreatePostBar";
import Header from "../header/Header";
import Post from "../post/Post";

const HomeMainContent = () => {
	return (
		<Header heading="Home">
			<CreatePostBar />
			<Post />
		</Header>
	);
};

export default HomeMainContent;
