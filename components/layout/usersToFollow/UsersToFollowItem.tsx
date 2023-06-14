import Image from 'next/image'
import Button from '@/components/Button'
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
          <p className="text-3xl font-medium text-white">{username}</p>
          <span className=" text-xl text-gray-500">@{username}</span>
        </div>
      </div>
      <Button className="hidden w-28 text-xl font-semibold md:block">Follow</Button>
    </li>
  )
}

export default UsersToFollowItem
