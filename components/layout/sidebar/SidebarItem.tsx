import { IconType } from "react-icons";

interface SidebarItemProps {
	label: string;
	icon: IconType;
	auth: boolean;
}

const SidebarItem = ({ icon: Icon, label }: SidebarItemProps) => {
	return (
		<li className="flex items-center gap-3 text-white cursor-pointer p-2 rounded-full transition-all hover:bg-white hover:text-sky-500 shadow">
			<Icon className="text-3xl" />
			<p className="hidden md:block text-xl">{label}</p>
		</li>
	);
};

export default SidebarItem;
