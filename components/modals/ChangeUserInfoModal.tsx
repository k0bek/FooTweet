import axios from 'axios'
import { useRouter } from 'next/router'
import { EditUserInfoAttributes } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useMutation } from 'react-query'

import { useModalStore, useUser } from '@/hooks/useStore'

import lewy from './../../assets/images/lewy.jpg'
import { Input } from '../Input'
import { Button } from '../Button'
import { useState } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

interface ChangeUserInfoModalProps {
  refetchProfilePosts: () => void
  refetchUser: () => void
}

const ChangeUserInfoModal = ({ refetchUser, refetchProfilePosts }: ChangeUserInfoModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const userId = session.data?.user.id as string
  const user = useUser(userId)
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)

  const [handleIsUserInfoModalOpen] = useModalStore((state) => [state.handleIsUserInfoModalOpen])

  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      name: '',
      bio: '',
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  })

  const editUserInfo = useMutation({
    mutationFn: (newInfo: EditUserInfoAttributes) => {
      setIsLoading(true)
      return axios.post(`/api/users/${router.query.profileId}`, newInfo)
    },
    onSuccess: () => {
      setIsLoading(false)
      toast.success('Changed user info properly')
      refetchProfilePosts()
      refetchUser()
      reset()
    },

    onError: () => {
      setIsLoading(false)
      toast.error('Error with adding posts. Please try again')
    },
  })

  const changePassword = useMutation({
    mutationFn: (passwords: EditUserInfoAttributes) => {
      setIsLoading(true)
      return axios.post(`/api/users/change-password`, passwords)
    },
    onSuccess: async () => {
      setIsLoading(false)
      toast.success('Changed password succesfully')
      reset()
    },

    onError: () => {
      setIsLoading(false)
      toast.error('Error with changing password. Please try again')
    },
  })

  const onSubmit = async () => {
    const { name, bio, oldPassword, newPassword } = getValues()

    const nameAndBio = {
      ...(name !== '' ? { name } : { name: user.user.name }),
      ...(bio !== '' ? { bio } : { bio: user.user.bio }),
      ...(profileImage !== null
        ? { profileImage: `https://res.cloudinary.com/dedatowvi/image/upload/${profileImage}` }
        : { profileImage: user.user.profileImage }),
      ...(backgroundImage !== null
        ? { backgroundImage: `https://res.cloudinary.com/dedatowvi/image/upload/${backgroundImage}` }
        : { backgroundImage: user.user.backgroundImage }),
    }

    if (newPassword && oldPassword) {
      changePassword.mutate({ oldPassword, newPassword })
    }
    editUserInfo.mutate(nameAndBio)
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-60 px-5">
      <div className="relative flex w-[30rem] flex-col gap-3 rounded-2xl bg-white px-2 py-8 xs:w-[40rem] sm:w-[50rem]">
        <div className="mb-5 flex w-full justify-between px-5">
          <div className="flex items-center gap-8 text-4xl font-medium">
            <Button onClick={handleIsUserInfoModalOpen} theme="white" size="default">
              <AiOutlineClose />
            </Button>
            <p className="ml-[-1rem]">Edit profile</p>
          </div>
          <Button size="default" theme="black" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Save
          </Button>
        </div>
        <div className="relative flex h-52 w-full items-center justify-center bg-gray-700">
          <div className="absolute">
            <CldUploadWidget
              uploadPreset="izvxat0t"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onUpload={(result: any) => {
                setBackgroundImage(result.info.path)
              }}
            >
              {({ open }) => {
                function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
                  e.preventDefault()
                  open()
                }
                return (
                  <Button size="xxl" onClick={handleOnClick}>
                    <MdAddPhotoAlternate />
                  </Button>
                )
              }}
            </CldUploadWidget>
          </div>
          {user.user?.backgroundImage && !backgroundImage ? (
            <CldImage
              width="500"
              height="60"
              src={user.user.backgroundImage}
              sizes="100vw"
              alt="Description of my image"
              className="h-full w-full"
            />
          ) : (
            <CldImage
              width="85"
              height="60"
              src={`https://res.cloudinary.com/dedatowvi/image/upload/${backgroundImage}`}
              sizes="100vw"
              alt="Description of my image"
              className="h-full w-full"
            />
          )}
          <div className="absolute left-4 top-32">
            {user.user.profileImage || profileImage ? (
              <CldImage
                width="80"
                height="80"
                src={
                  profileImage
                    ? `https://res.cloudinary.com/dedatowvi/image/upload/${profileImage}`
                    : user.user.profileImage
                }
                alt="Description of my image"
                className="h-32 w-32 rounded-full"
                sizes="100vw"
              />
            ) : (
              <Image className="h-32 w-32 rounded-full" src={lewy} alt="Profile image" />
            )}
            <div className="absolute bottom-4 left-8">
              <CldUploadWidget
                uploadPreset="izvxat0t"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onUpload={(result: any) => {
                  setProfileImage(result.info.path)
                }}
              >
                {({ open }) => {
                  function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
                    e.preventDefault()
                    open()
                  }
                  return (
                    <Button size="xxl" onClick={handleOnClick}>
                      <MdAddPhotoAlternate />
                    </Button>
                  )
                }}
              </CldUploadWidget>
            </div>
          </div>
        </div>
        <form
          className="mt-20 flex w-full flex-col gap-5 px-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }
          }}
          aria-hidden="true"
        >
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="name">
              Name
            </label>
            <Input
              placeholder={user?.user.name}
              type="text"
              id="name"
              register={register('name', {
                maxLength: {
                  value: 12,
                  message: 'Your username is too long.',
                },
              })}
              variant="default"
              theme="white"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="bio">
              Bio
            </label>
            <Input
              placeholder={!user?.user.bio === undefined ? 'You have no bio' : user?.user.bio}
              type="text"
              id="bio"
              register={{ ...register('bio') }}
              theme="white"
              variant="default"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="oldPassword">
              Old Password
            </label>
            <Input
              type="password"
              id="oldPassword"
              register={{ ...register('oldPassword') }}
              variant="default"
              theme="white"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="newPassword">
              New Password
            </label>
            <Input
              type="password"
              id="newPassword"
              register={{ ...register('newPassword') }}
              variant="default"
              theme="white"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangeUserInfoModal
