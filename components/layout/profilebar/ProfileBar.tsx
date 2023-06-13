import 'react-loading-skeleton/dist/skeleton.css';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';

import lewy from './../../../assets/images/lewy.jpg';

const ProfileBar = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-800 rounded-2xl hidden xl:flex flex-col items-center relative py-4">
      <Image
        src={lewy}
        width={50}
        height={40}
        alt="User's profile image"
        className="w-full h-28 absolute top-0 left-0 rounded-t-lg"
      />
      <Image
        src={lewy}
        width={80}
        height={40}
        alt="User's profile image"
        className="rounded-full z-[1] mt-4"
      />
      {session?.user ? (
        <p className="text-white font-medium text-3xl mt-5">
          {session.user.name ? session.user?.name : session.user.username}
        </p>
      ) : (
        <Skeleton
          width={110}
          height={20}
          className="text-white font-medium text-3xl mt-5"
        />
      )}

      {session?.user ? (
        <span className=" text-gray-500 text-xl mt-2">@{session?.user.username}</span>
      ) : (
        <Skeleton
          width={110}
          height={20}
          className="text-white font-medium text-3xl mt-3"
        />
      )}

      <div className="flex border-t-2 border-b-2 border-gray-700 w-full mt-3">
        <div className="text-center w-1/2 border-r-2 border-gray-700 p-2">
          <p className="font-bold text-white text-2xl">124</p>
          <span className="text-gray-500 text-xl">Following</span>
        </div>
        <div className="text-center w-1/2 p-2">
          <p className="font-bold text-white text-2xl">124</p>
          <span className="text-gray-500 text-xl">Followers</span>
        </div>
      </div>
      <Link
        href={`/profile/${session?.user?.id}`}
        className="text-blue-500 cursor-pointer px-4 text-2xl mt-4"
      >
        My profile
      </Link>
    </div>
  );
};

export default ProfileBar;
