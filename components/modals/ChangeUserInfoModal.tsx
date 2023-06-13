import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { EditUserInfoAttributes } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useMutation } from 'react-query';

import { useUser } from '@/lib/hooks';

import lewy from './../../assets/images/lewy.jpg';
import { useModalStore } from '@/hooks/useStore';

interface ChangeUserInfoModalProps {
  refetchUser: () => void;
}

const ChangeUserInfoModal = ({ refetchUser }: ChangeUserInfoModalProps) => {
  const session = useSession();
  const userId = session.data?.user.id as string;
  const user = useUser(userId);
  const router = useRouter();

  const [handleIsUserInfoModalOpen] = useModalStore((state) => [
    state.handleIsUserInfoModalOpen,
  ]);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: '',
      bio: '',
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const editUserInfo = useMutation({
    mutationFn: (newInfo: EditUserInfoAttributes) => {
      return axios.post(`/api/users/${router.query.profileId}`, newInfo);
    },
    onSuccess: () => {
      toast.success('Changed password succesfully');
      refetchUser();
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again');
    },
  });

  const changePassword = useMutation({
    mutationFn: (passwords: EditUserInfoAttributes) => {
      return axios.post(`/api/users/change-password`, passwords);
    },
    onSuccess: async () => {
      toast.success('Changed password succesfully');
    },

    onError: () => {
      toast.error('Error with changing password. Please try again');
    },
  });

  const onSubmit = async () => {
    const { name, bio, oldPassword, newPassword } = getValues();

    const nameAndBio = {
      ...(name !== '' && { name }),
      ...(bio !== '' && { bio }),
    };

    if (newPassword && oldPassword) {
      changePassword.mutate({ oldPassword, newPassword });
    }
    editUserInfo.mutate(nameAndBio);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center z-10 px-5 overflow-hidden">
      <div className="flex flex-col gap-3 bg-white py-8 px-2 rounded-2xl w-[30rem] xs:w-[40rem] sm:w-[50rem] relative">
        <div className="flex justify-between w-full mb-5 px-5">
          <div className="flex items-center gap-8 text-4xl font-medium">
            <button
              className="cursor-pointer hover:text-gray-500 transition-all"
              onClick={handleIsUserInfoModalOpen}
            >
              <AiOutlineClose />
            </button>
            <p>Edit profile</p>
          </div>
          <button
            className="bg-black text-white px-10 py-3 text-2xl rounded-full font-semibold"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
        </div>
        <div className="relative w-full bg-gray-700 h-52 flex justify-center items-center">
          <button className="text-6xl cursor-pointer hover:opacity-90 transition-all text-white">
            <MdAddPhotoAlternate />
          </button>
          <div className="absolute left-4 top-32">
            <Image
              src={lewy}
              className="rounded-full h-32 w-32 md:w-36 md:h-36"
              alt="Profile image"
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
              <button className="bg-black p-2 rounded-full bg-opacity-70 hover:bg-opacity-60 transition-all">
                <MdAddPhotoAlternate />
              </button>
            </div>
          </div>
        </div>
        <form className="w-full px-2 mt-20 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">Name</label>
            <input
              className="
    p-4 
    text-xl 
    bg-white 
    border-2
    border-neutral-200 
    rounded-md
    outline-none
    text-black
    focus:border-sky-500
    focus:border-2
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    w-full
    "
              placeholder={user?.user.name}
              {...register('name')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">Bio</label>
            <input
              className="
    p-4 
    text-xl 
    bg-white 
    border-2
    border-neutral-200 
    rounded-md
    outline-none
    text-black
    focus:border-sky-500
    focus:border-2
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    w-full
    "
              placeholder={
                !user?.user.bio === undefined ? 'You have no bio' : user?.user.bio
              }
              {...register('bio')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">Old Password</label>
            <input
              className="
    p-4 
    text-xl 
    bg-white 
    border-2
    border-neutral-200 
    rounded-md
    outline-none
    text-black
    focus:border-sky-500
    focus:border-2
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    w-full
    "
              type="password"
              {...register('oldPassword')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">New Password</label>
            <input
              className="
    p-4 
    text-xl 
    bg-white 
    border-2
    border-neutral-200 
    rounded-md
    outline-none
    text-black
    focus:border-sky-500
    focus:border-2
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    w-full
    "
              {...register('newPassword')}
              type="password"
            />
          </div>
        </form>
        <div className="flex w-full items-center justify-between"></div>
      </div>
    </div>
  );
};

export default ChangeUserInfoModal;
