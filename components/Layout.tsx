import React, { useState } from 'react';

import ProfileBar from './layout/profilebar/ProfileBar';
import SideBar from './layout/sidebar/Sidebar';
import UsersToFollow from './layout/usersToFollow/UsersToFollow';
import Modal from './modals/AuthModal';

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
    <div className="relative flex justify-center max-w-[1700px]">
      <SideBar onClick={changeModalVisibilityHandler} />
      {children}
      <div className="absolute right-8 top-[25vh]">
        <div className="flex flex-col gap-5">
          <ProfileBar />
          <UsersToFollow />
        </div>
      </div>

      {isModalVisible && (
        <Modal
          isLoginForm={isLoginForm}
          isModalVisible={isModalVisible}
          changeFormHandler={changeFormHandler}
          changeModalVisibilityHandler={changeModalVisibilityHandler}
        />
      )}
      {/* <ChangeUserInfo /> */}
    </div>
  );
};

export default Layout;
