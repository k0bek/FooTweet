import moment from 'moment'
import Image from 'next/image'

import lewy from './../../assets/images/lewy.jpg'
import { useUser } from '@/hooks/useStore'
interface CommentProps {
  commentValue: string
  data_time: string
  userId: string
}

const Comment = ({ commentValue, data_time, userId }: CommentProps) => {
  const { user } = useUser(userId)

  return (
    <div className="flex w-full cursor-pointer flex-col rounded-2xl bg-slate-700 p-7 transition-all hover:bg-slate-700/90">
      <div className="flex h-full w-full flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image
            src={user?.profileImage ? user?.profileImage : lewy}
            width={50}
            height={50}
            alt="User's profile image"
            className="h-20 w-20 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex flex-col items-start xs:flex-row xs:items-end xs:gap-2">
                  <span className="text-xl font-semibold text-white xs:text-2xl">
                    {user?.name ? user.name : user.username}
                  </span>
                  <span className=" font-medium text-gray-400 xs:text-xl">@{user && user.username}</span>
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
