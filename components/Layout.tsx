import React, { useState } from 'react'

import { useModalStore, useUser } from '@/hooks/useStore'

import ProfileBar from './layout/profilebar/ProfileBar'
import Sidebar from './layout/sidebar/Sidebar'
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
  const userId = session.data?.user.id
  const { user, refetchUser } = useUser(userId as string)

  const changeFormHandler = () => {
    setIsLoginForm((prev) => {
      return !prev
    })
  }

  return (
    <div className="relative flex max-w-[1700px] justify-center">
      <Sidebar />
      {children}
      <div className="absolute right-8 top-[25vh]">
        <div className="flex flex-col gap-5">
          {session.data?.user ? <ProfileBar user={user} /> : <NewUserThumbnail />}
          <UsersToFollow user={user} refetchUser={refetchUser} />
        </div>
      </div>

      {isAuthModalOpen && <Modal isLoginForm={isLoginForm} changeFormHandler={changeFormHandler} />}
    </div>
  )
}

export default Layout
