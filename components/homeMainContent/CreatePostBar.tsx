import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, ChangeEvent } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'

import getCurrentData from '@/hooks/useCurrentData'
import { PostAttributes } from '@/types/next-auth'

import { Textarea } from '../Textarea'
import lewy from './../../assets/images/lewy.jpg'
import { Button } from '../Button'
import { useUser } from '@/lib/hooks'

interface CreatePostBarProps {
  refetchProfilePosts?: () => void
}

const CreatePostBar = ({ refetchProfilePosts }: CreatePostBarProps) => {
  const [postValue, setPostValue] = useState('')
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id
  const { user } = useUser(userId as string)

  console.log(user)

  const createdPost = useMutation({
    mutationFn: (newPost: PostAttributes) => {
      return axios.post('/api/posts', newPost)
    },
    onSuccess: () => {
      router.replace(router.asPath)
      setPostValue('')
      toast.success('Added tweet correctly!')
      {
        refetchProfilePosts && refetchProfilePosts()
      }
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again')
    },
  })

  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-slate-700 p-7">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
        <Image src={lewy} width={67} height={60} alt="User's profile image" className="rounded-full" />
        <Textarea
          placeholder="What's happening?"
          value={postValue}
          disabled={createdPost.isLoading || !user}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setPostValue(event.target.value)
          }}
        />
      </div>
      <div className="mt-5 flex w-full justify-end gap-1 sm:gap-5">
        <Button
          onClick={async () => {
            createdPost.mutate({
              userId: userId,
              postValue,
              data_time: getCurrentData(),
              username: user?.username,
              name: user?.name,
            })
          }}
          size="default"
          theme="blue"
          disabled={createdPost.isLoading || !user}
        >
          Tweet
        </Button>
      </div>
    </div>
  )
}

export default CreatePostBar
