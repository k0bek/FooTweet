import Link from 'next/link';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  auth: boolean;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <li className="flex items-center gap-3 text-white cursor-pointer p-2 rounded-full transition-all hover:bg-white hover:text-sky-500 ">
        <Icon className="text-5xl" />
        <p className="hidden md:block text-2xl">{label}</p>
      </li>
    </Link>
  );
};

export default SidebarItem;
