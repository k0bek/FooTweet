import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CommentAttributes } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'

import useCurrentData from '@/hooks/useCurrentData'

import { Textarea } from '../Textarea'
import lewy from './../../assets/images/lewy.jpg'
import { Button } from '../Button'
import { useUser } from '@/hooks/useStore'

interface CreateCommentBarProps {
  refetchComments: () => void
}

const CreateCommentBar = ({ refetchComments }: CreateCommentBarProps) => {
  const [commentValue, setCommentValue] = useState('')
  const session = useSession()
  const currentData = useCurrentData()
  const router = useRouter()
  const userId = session.data?.user.id
  const { user } = useUser(userId as string)

  console.log(user)

  const mutation = useMutation({
    mutationFn: (newComment: CommentAttributes) => {
      return axios.post('/api/comments', newComment)
    },
    onSuccess: () => {
      setCommentValue('')
      toast.success('Added tweet correctly!')
      refetchComments()
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again')
    },
  })

  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-slate-700 p-7">
      <div className="flex h-full w-full flex-col items-center gap-4 sm:flex-row">
        <Image
          src={user?.profileImage ? user?.profileImage : lewy}
          width={67}
          height={60}
          alt="User's profile image"
          className="h-24 w-24 rounded-full"
        />
        <Textarea
          placeholder="Add your comment"
          value={commentValue}
          disabled={mutation.isLoading || !session.data}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setCommentValue(event.target.value)
          }}
        />
      </div>
      <div className="mt-5 flex w-full justify-end gap-1 sm:gap-5">
        <Button
          onClick={async () => {
            mutation.mutate({
              commentValue,
              data_time: currentData,
              postId: router.query.postid,
              userId: session.data?.user.id,
              name: user?.name,
              username: user.username,
              profileImage: user.profileImage,
            })
          }}
          disabled={mutation.isLoading || !session.data || !commentValue}
          theme="blue"
          size="sm"
        >
          Comment
        </Button>
      </div>
    </div>
  )
}

export default CreateCommentBar
