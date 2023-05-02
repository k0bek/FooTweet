import lewy from "./../../../public/images/lewy.jpg";
import Image from "next/image";

const ProfileBar = () => {
	return (
		<div className="bg-gray-800 h-82 w-80 rounded-lg mr-10 hidden xl:flex flex-col items-center relative">
			<Image
				src={lewy}
				width={50}
				height={40}
				alt="User's profile image"
				className="w-full h-20 absolute top-0 left-0 rounded-t-lg"
			/>
			<Image
				src={lewy}
				width={80}
				height={40}
				alt="User's profile image"
				className="rounded-full z-10 mt-10"
			/>
			<p className="text-white font-medium text-xl mt-3">Kubusieg</p>
			<span className=" text-gray-500 text-lg">@kubusieg</span>

			<div className="flex border-t-2 border-b-2 border-gray-700 w-full mt-3">
				<div className="text-center w-1/2 border-r-2 border-gray-700 p-2">
					<p className="font-bold text-white">124</p>
					<span className="text-gray-500">Following</span>
				</div>
				<div className="text-center w-1/2 p-2">
					<p className="font-bold text-white">124</p>
					<span className="text-gray-500">Followers</span>
				</div>
			</div>
			<p className="text-blue-500 cursor-pointer my-3 px-4">My profile</p>
		</div>
	);
};

export default ProfileBar;
