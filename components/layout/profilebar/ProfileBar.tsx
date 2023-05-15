import Image from 'next/image';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import lewy from './../../../assets/images/lewy.jpg';
import { useRouter } from 'next/router';

const ProfileBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  const goToProfilePage = async () => {
    await router.push(`/profile/${user?.id}`);
  };

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
      <p className="text-white font-medium text-3xl mt-3">
        {session?.user && session.user.username}
      </p>
      <span className=" text-gray-500 text-xl mt-2">@{session?.user.username}</span>

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
      <p
        className="text-blue-500 cursor-pointer px-4 text-2xl mt-4"
        onClick={goToProfilePage}
      >
        My profile
      </p>
    </div>
  );
};

export default ProfileBar;
