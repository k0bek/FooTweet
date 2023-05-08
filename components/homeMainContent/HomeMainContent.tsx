import React from "react";
import CreatePostBar from "./CreatePostBar";
import Header from "../header/Header";

const HomeMainContent = () => {
	return (
		<Header heading="Home">
			<CreatePostBar />
		</Header>
	);
};

export default HomeMainContent;
