import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { EditUserInfoAttributes } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useMutation } from 'react-query'

import { useModalStore } from '@/hooks/useStore'
import { useUser } from '@/lib/hooks'

import lewy from './../../assets/images/lewy.jpg'
import { Input } from '../Input'
import { Button } from '../Button'

interface ChangeUserInfoModalProps {
  refetchUser: () => void
}

const ChangeUserInfoModal = ({ refetchUser }: ChangeUserInfoModalProps) => {
  const session = useSession()
  const userId = session.data?.user.id as string
  const user = useUser(userId)
  const router = useRouter()

  const [handleIsUserInfoModalOpen] = useModalStore((state) => [state.handleIsUserInfoModalOpen])

  const { register, handleSubmit, getValues } = useForm({
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
      return axios.post(`/api/users/${router.query.profileId}`, newInfo)
    },
    onSuccess: () => {
      toast.success('Changed password succesfully')
      refetchUser()
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again')
    },
  })

  const changePassword = useMutation({
    mutationFn: (passwords: EditUserInfoAttributes) => {
      return axios.post(`/api/users/change-password`, passwords)
    },
    onSuccess: async () => {
      toast.success('Changed password succesfully')
    },

    onError: () => {
      toast.error('Error with changing password. Please try again')
    },
  })

  const onSubmit = async () => {
    const { name, bio, oldPassword, newPassword } = getValues()

    const nameAndBio = {
      ...(name !== '' && { name }),
      ...(bio !== '' && { bio }),
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
          <Button size="default" theme="black" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
        <div className="relative flex h-52 w-full items-center justify-center bg-gray-700">
          <Button size="xxl">
            <MdAddPhotoAlternate />
          </Button>
          <div className="absolute left-4 top-32">
            <Image src={lewy} className="h-32 w-32 rounded-full md:h-36 md:w-36" alt="Profile image" />
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
              <Button size="xl">
                <MdAddPhotoAlternate />
              </Button>
            </div>
          </div>
        </div>
        <form className="mt-20 flex w-full flex-col gap-5 px-2">
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="name">
              Name
            </label>
            <Input
              placeholder={user?.user.name}
              type="text"
              id="name"
              {...register('name')}
              variant="default"
              theme="white"
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
              {...register('bio')}
              theme="white"
              variant="default"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="oldPassword">
              Old Password
            </label>
            <Input type="password" id="oldPassword" {...register('oldPassword')} variant="default" theme="white" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium" htmlFor="newPassword">
              New Password
            </label>
            <Input type="password" id="newPassword" {...register('newPassword')} variant="default" theme="white" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangeUserInfoModal
