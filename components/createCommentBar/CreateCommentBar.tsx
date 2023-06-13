import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CommentAttributes } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import useCurrentData from '@/hooks/useCurrentData';

import Textarea from '../Textarea';
import lewy from './../../assets/images/lewy.jpg';

interface CreateCommentBarProps {
  refetchComments: () => void;
}

const CreateCommentBar = ({ refetchComments }: CreateCommentBarProps) => {
  const [commentValue, setCommentValue] = useState('');
  const router = useRouter();
  const session = useSession();

  const mutation = useMutation({
    mutationFn: (newComment: CommentAttributes) => {
      return axios.post('/api/comments', newComment);
    },
    onSuccess: () => {
      setCommentValue('');
      toast.success('Added tweet correctly!');
      refetchComments();
    },

    onError: () => {
      toast.error('Error with adding posts. Please try again');
    },
  });

  return (
    <div className="flex items-center flex-col bg-slate-700 rounded-2xl w-full p-7">
      <div className="h-full w-full flex items-center gap-4 flex-col sm:flex-row">
        <Image
          src={lewy}
          width={67}
          height={60}
          alt="User's profile image"
          className="rounded-full"
        />
        <Textarea
          placeholder="Add your comment"
          value={commentValue}
          disabled={mutation.isLoading}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setCommentValue(event.target.value);
          }}
        />
      </div>
      <div className="mt-5 flex gap-1 sm:gap-5 w-full justify-end">
        <button
          onClick={async () => {
            mutation.mutate({
              commentValue,
              data_time: useCurrentData(),
              postId: router.query.postId,
              username: session.data?.user.username,
            });
          }}
          className={`border border-gray-600  text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-bold flex items-center gap-3 ${
            mutation.isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-500'
          }`}
          disabled={mutation.isLoading}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CreateCommentBar;
