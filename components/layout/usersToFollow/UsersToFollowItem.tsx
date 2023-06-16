import Image from 'next/image'
import { Button } from '@/components/Button'
import lewy from './../../../assets/images/lewy.jpg'
interface UsersToFollowItemProps {
  image: string
  username: string
}

const UsersToFollowItem = ({ image, username }: UsersToFollowItemProps) => {
  return (
    <li className="flex w-full cursor-pointer items-center justify-between gap-10 px-4 py-4 transition-all hover:bg-gray-700">
      <div className="flex items-center justify-center gap-4">
        <Image src={image ? lewy : lewy} width={50} height={40} alt="User's profile image" className="rounded-full" />
        <div className="flex flex-col justify-center">
          <p className="break-keep text-2xl font-medium text-white">
            {username.length > 13 ? `${username.slice(0, 13)}...` : username}
          </p>
          <span className=" text-xl text-gray-500">@{username}</span>
        </div>
      </div>
      <Button size="sm" theme="blue">
        Follow
      </Button>
    </li>
  )
}

export default UsersToFollowItem
