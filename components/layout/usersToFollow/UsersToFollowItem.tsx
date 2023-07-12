import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/Button'
import lewy from './../../../assets/images/lewy.jpg'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth/core/types'
import { useUser } from '@/lib/hooks'

interface UsersToFollowItemProps {
  image: string
  username: string
  userId: string
  user: User
  refetchUser: () => void
  profileImage: string
}

const UsersToFollowItem = ({ profileImage, username, userId, user, refetchUser }: UsersToFollowItemProps) => {
  const router = useRouter()
  const session = useSession()

  const [isUserFollowed, setIsUserFollowed] = useState<boolean>(user?.following?.some((obj) => obj._id === userId))

  const followedUser = useUser(userId)

  useEffect(() => {
    setIsUserFollowed(user?.following && user?.following?.some((obj) => obj?._id === userId))
  }, [userId, user?.following])

  const handleIsUserFollowed = () => {
    setIsUserFollowed((prev: boolean) => {
      return !prev
    })
  }

  const mutation = useMutation((likedPost: { following: User; userId: string }) => {
    if (isUserFollowed) {
      return axios.delete(`/api/follow/${userId}`)
    } else {
      return axios.post(`/api/follow/${userId}`, likedPost)
    }
  })

  const handleFollowButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    handleIsUserFollowed()
    event.stopPropagation()
    await mutation.mutateAsync({
      userId: session.data?.user.id as string,
      following: followedUser.user,
    })
    refetchUser()
  }

  return (
    <li
      className="flex w-full cursor-pointer items-center justify-between gap-10 px-4 py-4 transition-all hover:bg-gray-700"
      onClick={() => {
        router.push(`/profile/${userId}`)
      }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center gap-4">
        <Image
          src={profileImage ? profileImage : lewy}
          width={50}
          height={50}
          alt="User's profile image"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <p className="break-keep text-2xl font-medium text-white">{user?.name ? user.name : username}</p>
          <span className="text-xl text-gray-500">
            @{username.length > 13 ? `${username.slice(0, 13)}...` : username}
          </span>
        </div>
      </div>
      <Button
        size="sm"
        theme="blue"
        onClick={handleFollowButtonClick}
        className={`${isUserFollowed && 'bg-gray-500'} z-1`}
        disabled={!session.data?.user}
      >
        Follow
      </Button>
    </li>
  )
}

export default UsersToFollowItem
