import React, { useState } from 'react';

import ProfileBar from './layout/profilebar/ProfileBar';
import SideBar from './layout/sidebar/Sidebar';
import UsersToFollow from './layout/usersToFollow/UsersToFollow';
import Modal from './modals/AuthModal';
import { useModalStore } from '@/hooks/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isAuthModalOpen] = useModalStore((state) => [state.isAuthModalOpen]);

  const changeFormHandler = () => {
    setIsLoginForm((prev) => {
      return !prev;
    });
  };

  return (
    <div className="relative flex justify-center max-w-[1700px]">
      <SideBar />
      {children}
      <div className="absolute right-8 top-[25vh]">
        <div className="flex flex-col gap-5">
          <ProfileBar />
          <UsersToFollow />
        </div>
      </div>

      {isAuthModalOpen && (
        <Modal isLoginForm={isLoginForm} changeFormHandler={changeFormHandler} />
      )}
    </div>
  );
};

export default Layout;
