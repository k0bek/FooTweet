import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai'
import { FaComments } from 'react-icons/fa'

import lewy from './../../assets/images/lewy.jpg'
import { Button } from '../Button'
interface PostProps {
  username: string
  postValue: string
  id?: string
  data_time: string
}

const Post = ({ username, postValue, id, data_time }: PostProps) => {
  const router = useRouter()

  const goToPost = () => {
    router.push(`/posts/${id}`)
  }

  return (
    <div className="flex w-full cursor-pointer flex-col rounded-2xl bg-slate-700 p-7 font-semibold transition-all hover:bg-slate-700/90">
      <div className="flex h-full w-full flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image src={lewy} height={50} alt="User's profile image" className="rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex flex-col items-start xs:flex-row xs:items-end xs:gap-2">
                  <span className="text-xl font-semibold text-white xs:text-2xl">{username}</span>
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
      <div className="mt-5 flex w-full justify-center gap-1 xs:gap-5">
        <Button className="flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-xs font-medium text-gray-300 transition-all hover:bg-red-500 xs:px-6 xs:text-xl">
          <AiFillHeart />
          Like
        </Button>
        <button
          className={`flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-xs font-medium text-white transition-all
          xs:px-6
          xs:text-xl`}
        >
          <AiOutlineRetweet />
          Retweet
        </button>
        <button
          className="flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-xs font-medium text-gray-300 transition-all hover:bg-zinc-500 xs:px-6 xs:text-xl"
          onClick={goToPost}
        >
          <FaComments />
        </button>
      </div>
    </div>
  )
}

export default Post
