import React, { useState } from 'react'

import { useModalStore } from '@/hooks/useStore'

import ProfileBar from './layout/profilebar/ProfileBar'
import SideBar from './layout/sidebar/Sidebar'
import UsersToFollow from './layout/usersToFollow/UsersToFollow'
import Modal from './modals/AuthModal'
import { useSession } from 'next-auth/react'
import NewUserThumbnail from './layout/newUserThumbnail/NewUserThumbnail'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isAuthModalOpen] = useModalStore((state) => [state.isAuthModalOpen])
  const session = useSession()

  const changeFormHandler = () => {
    setIsLoginForm((prev) => {
      return !prev
    })
  }

  return (
    <div className="relative flex max-w-[1700px] justify-center">
      <SideBar />
      {children}
      <div className="absolute right-8 top-[25vh]">
        <div className="flex flex-col gap-5">
          {session.data?.user ? <ProfileBar /> : <NewUserThumbnail />}
          <UsersToFollow />
        </div>
      </div>

      {isAuthModalOpen && <Modal isLoginForm={isLoginForm} changeFormHandler={changeFormHandler} />}
    </div>
  )
}

export default Layout
