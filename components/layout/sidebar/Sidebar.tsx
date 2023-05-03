import { BsTwitter } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaHashtag, FaUserAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FiFeather } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import Button from "@/components/Button";

const sidebarItems = [
	{
		label: "Home",
		icon: AiFillHome,
		auth: false,
	},
	{
		label: "Search",
		icon: BiSearch,
		auth: true,
	},
	{
		label: "Hashtags",
		icon: FaHashtag,
		auth: true,
	},
	{
		label: "Profile",
		icon: FaUserAlt,
		auth: true,
	},
	{
		label: "Messages",
		icon: IoMdNotifications,
		auth: true,
	},
];

interface SideBarProps {
	onClick: () => void;
}

const Sidebar = ({ onClick }: SideBarProps) => {
	return (
		<div className="h-full flex flex-col items-center text-5xl p-10 gap-8 bg-gray-800 md:w-60">
			<BsTwitter className="text-sky-500" />
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
			<Button className="hidden md:block w-full text-3xl" onClick={onClick}>
				Login
			</Button>
		</div>
	);
};

export default Sidebar;
