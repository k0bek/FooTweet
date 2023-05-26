import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { useMutation } from 'react-query';

import lewy from './../../assets/images/lewy.jpg';
interface PostProps {
  username: string;
  postValue: string;
  id?: string;
  data_time: string;
  quantityOfComments: number;
  retweeted?: boolean;
}

const Post = ({
  username,
  postValue,
  id,
  data_time,
  quantityOfComments,
  retweeted,
}: PostProps) => {
  const router = useRouter();

  const goToPost = () => {
    router.push(`/posts/${id}`);
  };

  const retweet = useMutation({
    mutationFn: (newRetweet: { postId: string; isRetweeted: boolean | undefined }) => {
      return axios.post('/api/retweet', newRetweet);
    },
    onSuccess: () => {
      router.replace(router.asPath);
    },
  });

  return (
    <div className="flex flex-col bg-slate-700 rounded-2xl w-full p-7 cursor-pointer hover:bg-slate-700/90 transition-all font-semibold">
      {retweeted && (
        <div className="flex items-center gap-3 text-xl px-4 mb-3 text-slate-300">
          <AiOutlineRetweet />
          <span>You retweeted this post</span>
        </div>
      )}
      <div className="h-full w-full flex flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image
            src={lewy}
            height={50}
            alt="User's profile image"
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex items-start flex-col xs:flex-row xs:items-end xs:gap-2">
                  <span className="text-white font-semibold text-xl xs:text-2xl">
                    {username}
                  </span>
                  <span className=" text-gray-400 font-medium xs:text-xl">
                    @{username}
                  </span>
                </div>
                <span className="text-gray-400 xs:text-xl">
                  {moment(data_time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
                </span>
              </div>
            </div>

            <p className="text-white text-lg xs:text-2xl">{postValue}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-1 xs:gap-5 w-full justify-center">
        <button className="border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-red-500 transition-all">
          <AiFillHeart />
          Like
        </button>
        <button
          className={`border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl font-medium flex items-center gap-3 transition-all text-white ${
            retweeted ? 'bg-blue-500 text-white' : ''
          }
          }`}
          onClick={async () => {
            retweet.mutate({
              postId: id as string,
              isRetweeted: retweeted,
            });
          }}
        >
          <AiOutlineRetweet />
          Retweet
        </button>
        <button
          className="border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-zinc-500 transition-all"
          onClick={goToPost}
        >
          <FaComments />
          Comment {quantityOfComments}
        </button>
      </div>
    </div>
  );
};

export default Post;
