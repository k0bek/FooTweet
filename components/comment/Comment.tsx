import moment from 'moment'
import Image from 'next/image'

import { AiOutlineRetweet } from 'react-icons/ai'

import lewy from './../../assets/images/lewy.jpg'
interface CommentProps {
  username: string
  commentValue: string
  data_time: string
  retweeted?: boolean
}

const Comment = ({ username, commentValue, data_time, retweeted }: CommentProps) => {
  return (
    <div className="flex w-full cursor-pointer flex-col rounded-2xl bg-slate-700 p-7 transition-all hover:bg-slate-700/90">
      <span className="mb-5 px-5 font-medium text-gray-200 xs:text-xl">
        {retweeted && (
          <div className="flex items-center gap-3">
            <AiOutlineRetweet />
            Retweeted
          </div>
        )}
      </span>
      <div className="flex h-full w-full flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image src={lewy} width={50} height={50} alt="User's profile image" className="rounded-full" />
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

            <p className="text-lg text-white xs:text-2xl">{commentValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
