import { useUser } from '@/lib/hooks'
import { useRouter } from 'next/router'
import Image from 'next/image'
import lewy from '@/assets/images/lewy.jpg'
import { Button } from '../Button'
import { AiOutlineClose } from 'react-icons/ai'
import { useModalStore } from '@/hooks/useStore'
import { useQuery } from 'react-query'
import { User } from 'next-auth/core/types'

const FollowersFollowingModal = ({ isFollowedList }: { isFollowedList: boolean }) => {
  const { profileId } = useRouter().query
  const { user } = useUser(profileId as string)
  const { data: users } = useQuery('users', () => fetch('../api/users').then((res) => res.json()))

  const [handleIsFollowersFollowingModalOpen] = useModalStore((state) => [state.handleIsFollowersFollowingModalOpen])

  const listData = isFollowedList ? user.followers : user.following

  const matchingUsers = users?.filter((user: User) => listData?.some((data: User) => data.id === user._id))

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-60 px-5">
      <div className="relative flex w-[30rem] flex-col gap-3 rounded-2xl bg-white px-2 py-8 xs:w-[40rem] sm:w-[50rem]">
        <div className="mb-5 flex w-full justify-between px-5">
          <div className="flex items-center gap-8 text-4xl font-medium">
            <p className="ml-[-1rem]">{isFollowedList ? 'Followers' : 'Following'}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <div className="w-full">
            <ul>
              {matchingUsers.length !== 0 ? (
                matchingUsers.map(
                  (item: { image: string; username: string; _id: string; name: string; profileImage: string }) => {
                    return (
                      <li key={item?._id} className="border-1 flex cursor-pointer items-center gap-3 p-2">
                        <Image
                          src={item?.profileImage ? item?.profileImage : lewy}
                          className="h-20 w-20 rounded-full"
                          alt="User image"
                          width={50}
                          height={50}
                        />
                        <div>
                          <p className="text-4xl transition-all hover:text-gray-500">
                            {item?.name ? item?.name : item?.username}
                          </p>
                          <p className="transition-all hover:text-gray-500">@{item?.username}</p>
                        </div>
                      </li>
                    )
                  }
                )
              ) : (
                <p className="text-center text-3xl">There is no users</p>
              )}
            </ul>
          </div>
        </div>
        <Button
          size="default"
          theme="black"
          className="t-0 absolute right-8"
          onClick={handleIsFollowersFollowingModalOpen}
        >
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  )
}

export default FollowersFollowingModal
