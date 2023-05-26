import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { AiFillHome } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { FaHashtag, FaUserAlt } from 'react-icons/fa';
import { FiFeather } from 'react-icons/fi';
import { IoMdNotifications } from 'react-icons/io';

import Button from '@/components/Button';

import SidebarItem from './SidebarItem';

const sidebarItems = [
  {
    label: 'Home',
    icon: AiFillHome,
    auth: false,
  },
  {
    label: 'Search',
    icon: BiSearch,
    auth: true,
  },
  {
    label: 'Hashtags',
    icon: FaHashtag,
    auth: true,
  },
  {
    label: 'Profile',
    icon: FaUserAlt,
    auth: true,
  },
  {
    label: 'Messages',
    icon: IoMdNotifications,
    auth: true,
  },
];

interface SideBarProps {
  onClick: () => void;
}

const Sidebar = ({ onClick }: SideBarProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="h-full flex flex-col items-center w-24 md:w-60 text-5xl py-10 gap-8 bg-gray-800 border-r-2 border-gray-700 fixed top-0 left-0">
      <button onClick={goToHome}>
        <BsTwitter className="text-sky-500" />
      </button>
      <ul className="flex flex-col gap-6 md:gap-8">
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              key={item.label}
            />
          );
        })}
      </ul>
      <Button className="block md:hidden">
        <FiFeather />
      </Button>
      {session ? (
        <Button className="hidden md:block w-3/4 text-3xl" onClick={signOut}>
          Logout
        </Button>
      ) : (
        <Button className="hidden md:block w-3/4 text-3xl" onClick={onClick}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
