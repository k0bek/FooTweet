import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { BsFillImageFill } from 'react-icons/bs';
import { useMutation } from 'react-query';

import getCurrentData from '@/hooks/useCurrentData';
import { PostAttributes } from '@/types/next-auth';

import Textarea from '../Textarea';
import lewy from './../../assets/images/lewy.jpg';

interface CreatePostBarProps {
  refetchProfilePosts?: () => void;
}

const CreatePostBar = ({ refetchProfilePosts }: CreatePostBarProps) => {
  const [postValue, setPostValue] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const createdPost = useMutation({
    mutationFn: (newPost: PostAttributes) => {
      return axios.post('/api/posts', newPost);
    },
    onSuccess: () => {
      router.replace(router.asPath);
      setPostValue('');
      toast.success('Added tweet correctly!');
      {
        refetchProfilePosts && refetchProfilePosts();
      }
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again');
    },
  });

  return (
    <div className="flex items-center flex-col bg-slate-700 rounded-2xl w-full p-7">
      <div className="w-full flex items-center gap-4 flex-col sm:flex-row">
        <Image
          src={lewy}
          width={67}
          height={60}
          alt="User's profile image"
          className="rounded-full"
        />
        <Textarea
          placeholder="What's happening?"
          value={postValue}
          disabled={createdPost.isLoading}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setPostValue(event.target.value);
          }}
        />
      </div>
      <div className="mt-5 flex gap-1 sm:gap-5 w-full justify-end">
        <button
          className={`border border-gray-600 text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 ${
            createdPost.isLoading ? 'bg-gray-500 cursor-not-allowed' : 'text-gray-300'
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
            });
          }}
          className={`border border-gray-600  text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-bold flex items-center gap-3 ${
            createdPost.isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-500'
          }`}
          disabled={createdPost.isLoading}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default CreatePostBar;
