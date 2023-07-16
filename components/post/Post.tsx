import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaComments } from 'react-icons/fa'
import { useState, useEffect } from 'react'

import lewy from './../../assets/images/lewy.jpg'
import { Button } from '../Button'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useModalStore } from '@/hooks/useStore'

interface PostProps {
  username: string
  postValue: string
  id?: string
  data_time: string
  userId: string
  usersWhoLiked?: string[]
  postImage: string
  name: string
  profileImage: string
}

const Post = ({
  postValue,
  id,
  data_time,
  userId,
  usersWhoLiked,
  postImage,
  username,
  name,
  profileImage,
}: PostProps) => {
  const router = useRouter()
  const session = useSession()
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false)
  const [amountOfLikes, setAmountOfLikes] = useState(usersWhoLiked?.length as number)
  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  useEffect(() => {
    if (usersWhoLiked && session.data) {
      setIsPostLiked(usersWhoLiked.includes(session.data.user.id))
      setAmountOfLikes(usersWhoLiked.length)
    }
  }, [usersWhoLiked, session.data])

  const mutation = useMutation({
    mutationFn: (likedPost: { usersWhoLiked: string }) => {
      if (isPostLiked) {
        return axios.delete(`/api/posts/${id}`)
      } else {
        return axios.post(`/api/posts/${id}`, likedPost)
      }
    },
  })

  const goToPost = () => {
    router.push(`/posts/${id}`)
  }

  const goToProfile = () => {
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="flex w-full cursor-pointer flex-col rounded-2xl bg-slate-700 p-7 font-semibold transition-all hover:bg-slate-700/90">
      <div className="flex h-full w-full flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image
            src={profileImage ? profileImage : lewy}
            height={50}
            width={50}
            alt="User's profile image"
            className="mr-2 h-20 w-20 rounded-full"
            onClick={goToProfile}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div
                  onClick={goToProfile}
                  aria-hidden={true}
                  className="flex flex-col items-start xs:flex-row xs:items-end xs:gap-2"
                >
                  <span className="text-xl font-semibold text-white xs:text-2xl">{name ? name : username}</span>
                  <span className=" font-medium text-gray-400 xs:text-xl">@{username}</span>
                </div>
                <span className="text-gray-400 xs:text-xl">
                  {moment(data_time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
                </span>
              </div>
            </div>
            <p className="break-all text-lg text-white xs:text-2xl">{postValue}</p>
          </div>
        </div>
      </div>
      {postImage && (
        <Image
          src={postImage}
          width={500}
          height={100}
          className="m-right bg- ml-24 mt-4 w-1/2 sm:w-1/3"
          alt="Post image"
        />
      )}
      <div className="mt-5 flex w-full justify-center gap-1 xs:gap-5">
        <Button
          className={`flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-xs font-medium text-gray-300 transition-all ${
            session.data?.user && 'hover:bg-red-500'
          } xs:px-6 xs:text-xl 
           ${isPostLiked ? 'bg-red-500 text-white' : ''}`}
          onClick={async () => {
            if (session.data?.user) {
              mutation.mutate({
                usersWhoLiked: userId,
              })
              setIsPostLiked(!isPostLiked)
              if (isPostLiked) {
                setAmountOfLikes((prev: number) => prev - 1)
              } else {
                setAmountOfLikes((prev: number) => prev + 1)
              }
            } else {
              handlIsAuthModalOpen()
            }
          }}
        >
          <AiFillHeart />
          Like ({amountOfLikes})
        </Button>
        <Button
          className={`flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-xs font-medium text-gray-300 transition-all  xs:px-6 xs:text-xl ${
            session?.data?.user && 'hover:bg-zinc-500'
          }`}
          onClick={() => {
            if (session.data?.user) {
              goToPost()
            } else {
              handlIsAuthModalOpen()
            }
          }}
        >
          <FaComments />
          Comments
        </Button>
      </div>
    </div>
  )
}

export default Post
