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
		label: "Notifications",
		icon: IoMdNotifications,
		auth: true,
	},
];

const Navbar = () => {
	return (
		<div className="h-full w-16 flex flex-col items-center text-3xl p-4 gap-8 bg-gray-800 md:w-52">
			<BsTwitter className="text-sky-500" />
			<ul className="flex flex-col gap-6">
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
			<Button variant="rounded">
				<FiFeather />
			</Button>
			<Button variant="rectangle">Tweet</Button>
		</div>
	);
};

export default Navbar;
