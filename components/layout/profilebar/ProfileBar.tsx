import 'react-loading-skeleton/dist/skeleton.css'

import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import lewy from './../../../assets/images/lewy.jpg'
import { User } from 'next-auth/core/types'

interface ProfileBarProps {
  user: User
  userId: string
}

const ProfileBar = ({ user, userId }: ProfileBarProps) => {
  return (
    <div className="relative hidden max-w-[29rem] flex-col items-center rounded-2xl bg-gray-800 py-4 xl:flex">
      <Image
        src={lewy}
        width={50}
        height={40}
        alt="User's profile image"
        className="absolute left-0 top-0 h-28 w-full rounded-t-lg"
      />
      <Image src={lewy} width={80} height={40} alt="User's profile image" className="z-[1] mt-4 rounded-full" />
      {user ? (
        <p className="mt-5 text-3xl font-medium text-white">{user.name ? user?.name : user.username}</p>
      ) : (
        <Skeleton width={110} height={20} className="mt-5 text-3xl font-medium text-white" />
      )}

      {user ? (
        <span className=" mt-2 text-xl text-gray-500">@{user.username}</span>
      ) : (
        <Skeleton width={110} height={20} className="mt-3 text-3xl font-medium text-white" />
      )}

      <div className="mt-3 flex w-full border-b-2 border-t-2 border-gray-700">
        <div className="w-1/2 border-r-2 border-gray-700 p-2 text-center">
          <p className="text-2xl font-bold text-white">{user?.following ? user.following.length : 0}</p>
          <span className="text-xl text-gray-500">Following</span>
        </div>
        <div className="w-1/2 p-2 text-center">
          <p className="text-2xl font-bold text-white">{user?.followers ? user.followers.length : 0}</p>
          <span className="text-xl text-gray-500">Followers</span>
        </div>
      </div>
      <Link href={`/profile/${userId}`} className="mt-4 cursor-pointer px-4 text-2xl text-blue-500">
        My profile
      </Link>
    </div>
  )
}

export default ProfileBar
