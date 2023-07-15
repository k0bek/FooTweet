import { useModalStore } from '@/hooks/useStore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface SidebarItemProps {
  label: string
  icon: IconType
  auth: boolean
  href: string
  active: boolean
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])
  const session = useSession()

  return (
    <Link
      href={href}
      onClick={() => {
        if (!session.data?.user) {
          handlIsAuthModalOpen()
        }
      }}
    >
      <li
        className={`flex cursor-pointer items-center justify-center gap-3 rounded-full p-2 px-4 text-white transition-all hover:bg-white hover:text-sky-500 ${
          active && 'bg-white'
        }`}
      >
        <Icon className={`text-5xl ${active && 'text-sky-500'} mr-auto w-10 `} />
        <p className={`hidden text-2xl md:block ${active && 'text-sky-500'} mr-auto`}>{label}</p>
      </li>
    </Link>
  )
}

export default SidebarItem
