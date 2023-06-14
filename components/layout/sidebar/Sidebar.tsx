import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { FaHashtag, FaUserAlt } from 'react-icons/fa'
import { FiFeather } from 'react-icons/fi'
import { IoMdNotifications } from 'react-icons/io'

import Button from '@/components/Button'
import { useModalStore } from '@/hooks/useStore'

import SidebarItem from './SidebarItem'

const sidebarItems = [
  {
    label: 'Home',
    icon: AiFillHome,
    auth: false,
    href: '/',
  },
  {
    label: 'Search',
    icon: BiSearch,
    auth: true,
    href: '/search',
  },
  {
    label: 'Hashtags',
    icon: FaHashtag,
    auth: true,
    href: '/hashtags',
  },
  {
    label: 'Profile',
    icon: FaUserAlt,
    auth: true,
    href: '/profile',
  },
  {
    label: 'Messages',
    icon: IoMdNotifications,
    auth: true,
    href: '/messages',
  },
]

const Sidebar = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [handleIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  const goToHome = () => {
    router.push('/')
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-24 flex-col items-center gap-8 border-r-2 border-gray-700 bg-gray-800 py-10 text-5xl md:w-60">
      <button onClick={goToHome}>
        <BsTwitter className="text-sky-500" />
      </button>
      <ul className="flex flex-col gap-6 md:gap-8">
        {sidebarItems.map((item) => {
          return <SidebarItem label={item.label} icon={item.icon} auth={item.auth} href={item.href} key={item.label} />
        })}
      </ul>
      <Button className="block md:hidden">
        <FiFeather />
      </Button>
      {session ? (
        <Button className="hidden w-3/4 text-3xl md:block" onClick={signOut}>
          Logout
        </Button>
      ) : (
        <Button className="hidden w-3/4 text-3xl md:block" onClick={handleIsAuthModalOpen}>
          Login
        </Button>
      )}
    </div>
  )
}

export default Sidebar
