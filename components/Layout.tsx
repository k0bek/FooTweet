import React, { useState } from "react";
import SideBar from "./layout/sidebar/Sidebar";
import UsersToFollow from "./layout/usersToFollow/UsersToFollow";
import ProfileBar from "./layout/profilebar/ProfileBar";
import Modal from "./modals/Modal";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const changeFormHandler = () => {
		setIsLoginForm((prev) => {
			return !prev;
		});
	};

	const changeModalVisibilityHandler = () => {
		setIsModalVisible((prev) => {
			return !prev;
		});
	};

	return (
		<div className="h-screen flex justify-between items-center">
			<SideBar onClick={changeModalVisibilityHandler} />
			{children}
			<div className="flex flex-col gap-5">
				<ProfileBar />
				<UsersToFollow />
				{isModalVisible && (
					<Modal
						isLoginForm={isLoginForm}
						isModalVisible={isModalVisible}
						changeFormHandler={changeFormHandler}
						changeModalVisibilityHandler={changeModalVisibilityHandler}
					/>
				)}
			</div>
		</div>
	);
};

export default Layout;
