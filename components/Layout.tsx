import React from "react";
import Navbar from "./layout/sidebar/Sidebar";
import UsersToFollow from "./layout/usersToFollow/UsersToFollow";
import ProfileBar from "./layout/profilebar/ProfileBar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="h-screen flex justify-between items-center">
			<Navbar />
			{children}
			<div className="flex flex-col gap-5">
				<ProfileBar />
				<UsersToFollow />
			</div>
		</div>
	);
};

export default Layout;
