import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, ChangeEvent } from 'react'
import { toast } from 'react-hot-toast'
import { BsFillImageFill } from 'react-icons/bs'
import { useMutation } from 'react-query'

import getCurrentData from '@/hooks/useCurrentData'
import { PostAttributes } from '@/types/next-auth'

import Textarea from '../Textarea'
import lewy from './../../assets/images/lewy.jpg'

interface CreatePostBarProps {
  refetchProfilePosts?: () => void
}

const CreatePostBar = ({ refetchProfilePosts }: CreatePostBarProps) => {
  const [postValue, setPostValue] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user

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
        <button
          className={`flex items-center gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-lg font-medium text-gray-300 sm:px-6 sm:text-xl ${
            createdPost.isLoading ? 'cursor-not-allowed bg-gray-500' : 'text-gray-300'
          }`}
          disabled={createdPost.isLoading}
        >
          <BsFillImageFill className="text-emerald-400 shadow-xl shadow-emerald-500" />
          Photo
        </button>
        <button
          onClick={async () => {
            createdPost.mutate({
              userId: user?.id,
              postValue,
              data_time: getCurrentData(),
              username: user?.username,
            })
          }}
          className={`flex items-center  gap-3 rounded-3xl border border-gray-600 px-3 py-3 text-lg font-bold text-gray-300 sm:px-6 sm:text-xl ${
            createdPost.isLoading || !user ? 'cursor-not-allowed bg-gray-500' : 'bg-sky-500'
          }`}
          disabled={createdPost.isLoading || !user}
        >
          Tweet
        </button>
      </div>
    </div>
  )
}

export default CreatePostBar
