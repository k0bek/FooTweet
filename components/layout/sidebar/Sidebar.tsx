import { useSession, signOut } from 'next-auth/react'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaHashtag, FaUserAlt } from 'react-icons/fa'
import { IoMdNotifications } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { TbLogin, TbLogout } from 'react-icons/tb'

import { Button } from '@/components/Button'
import { useModalStore } from '@/hooks/useStore'

import SidebarItem from './SidebarItem'
import Link from 'next/link'

const Sidebar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const sidebarItems = [
    {
      label: 'Home',
      icon: AiFillHome,
      auth: false,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Search',
      icon: BiSearch,
      auth: true,
      href: '/search',
      active: pathname === '/search',
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
      href: `/profile/${session?.user.id}`,
      active: pathname === `/profile/${session?.user.id}`,
    },
    {
      label: 'Messages',
      icon: IoMdNotifications,
      auth: true,
      href: '/messages',
    },
  ]

  const [handleIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  const signoutHandler = () => {
    signOut()
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-24 flex-col items-center gap-8 border-r-2 border-gray-700 bg-gray-800 py-10 text-5xl md:w-60">
      <Link href="/" className="hidden font-bold text-white md:block md:text-[2.7rem]">
        Foo<span className="text-blue-400">Tweet</span>
      </Link>
      <Link href="/" className="text-[2.7rem] font-bold text-white md:hidden md:text-[2.7rem]">
        F<span className="text-blue-400">T</span>
      </Link>
      <ul className="flex flex-col gap-6 md:gap-8">
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              href={item.href}
              key={item.label}
              active={item.active as boolean}
            />
          )
        })}
      </ul>
      {session ? (
        <>
          <Button size="lg" theme="blue" onClick={signoutHandler} className="hidden md:block">
            Logout
          </Button>
          <Button size="lg" theme="blue" onClick={signoutHandler} className="p-4 md:hidden">
            <TbLogout />
          </Button>
        </>
      ) : (
        <>
          <Button size="lg" theme="blue" onClick={handleIsAuthModalOpen} className="hidden md:block">
            Login
          </Button>
          <Button size="lg" theme="blue" onClick={handleIsAuthModalOpen} className="p-4 md:hidden">
            <TbLogin />
          </Button>
        </>
      )}
    </div>
  )
}

export default Sidebar
