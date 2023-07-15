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
import { BsFillImageFill } from 'react-icons/bs'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { useModalStore, useUser } from '@/hooks/useStore'

interface CreatePostBarProps {
  refetchProfilePosts?: () => void
}

const CreatePostBar = ({ refetchProfilePosts }: CreatePostBarProps) => {
  const [postImage, setPostImage] = useState<string>('')
  const [postValue, setPostValue] = useState('')
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id
  const { user } = useUser(userId as string)
  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  const createdPost = useMutation({
    mutationFn: (newPost: PostAttributes) => {
      return axios.post('/api/posts', newPost)
    },
    onSuccess: () => {
      router.replace(router.asPath)
      setPostValue('')
      toast.success('Added tweet correctly!')
      setPostImage('')
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
        <Image
          src={user?.profileImage ? user?.profileImage : lewy}
          width={67}
          height={60}
          alt="User's profile image"
          className="h-24 w-24 rounded-full"
        />
        <Textarea
          placeholder="What's happening?"
          value={postValue}
          disabled={createdPost.isLoading || !session?.data?.user}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setPostValue(event.target.value)
          }}
          className="disabled:cursor-not-allowed"
        />
      </div>
      {postImage && (
        <CldImage
          width="250"
          height="60"
          src={`https://res.cloudinary.com/dedatowvi/image/upload/${postImage}`}
          sizes="100vw"
          alt="Description of my image"
          className="mr-auto mt-5 h-40 w-40 rounded-xl"
        />
      )}
      <div className="mt-5 flex w-full justify-end ">
        <CldUploadWidget
          uploadPreset="izvxat0t"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onUpload={(result: any) => {
            setPostImage(result.info.path)
          }}
        >
          {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
              e.preventDefault()
              open()
            }
            return (
              <Button
                onClick={(event) => {
                  if (session?.data?.user) {
                    handleOnClick(event)
                  } else {
                    handlIsAuthModalOpen()
                  }
                }}
                disabled={createdPost.isLoading}
                className="disabled:bg-transparent"
              >
                <BsFillImageFill />
              </Button>
            )
          }}
        </CldUploadWidget>
        <Button
          onClick={async () => {
            if (session?.data?.user) {
              createdPost.mutate({
                userId: userId,
                postValue,
                data_time: getCurrentData(),
                username: user?.username,
                name: user?.name,
                usersWhoLiked: [],
                postImage: postImage ? `https://res.cloudinary.com/dedatowvi/image/upload/${postImage}` : null,
              })
            } else {
              handlIsAuthModalOpen()
            }
          }}
          size="default"
          theme="blue"
          disabled={createdPost.isLoading || (session.data?.user && !postValue)}
        >
          Tweet
        </Button>
      </div>
    </div>
  )
}

export default CreatePostBar
