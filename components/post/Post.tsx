import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';

import lewy from './../../assets/images/lewy.jpg';
interface PostProps {
  username: string;
  postValue: string;
  id: string;
  isComment: boolean;
}

const Post = ({ username, postValue, id, isComment }: PostProps) => {
  const router = useRouter();

  const goToPost = (event: Event) => {
    event.preventDefault();
    router.push(`/posts/${id}`);
  };

  return (
    <div className="flex flex-col bg-slate-700 rounded-2xl w-full p-7 cursor-pointer hover:bg-slate-700/90 transition-all">
      <div className="h-full w-full flex flex-col items-start gap-4 xs:flex-row">
        <div className="flex items-start gap-3">
          <Image
            src={lewy}
            width={50}
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
                <span className="text-gray-400 xs:text-xl">Few minutes ago</span>
              </div>
            </div>

            <p className="text-white text-lg xs:text-2xl">{postValue}</p>
          </div>
        </div>
      </div>
      {!isComment && (
        <div className="mt-5 flex gap-1 xs:gap-5 w-full justify-center">
          <button className="border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-red-500 transition-all">
            <AiFillHeart />
            Like
          </button>
          <button className="border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-blue-500 transition-all">
            <AiOutlineRetweet />
            Retweet
          </button>
          <button
            className="border border-gray-600 text-xs xs:text-xl py-3 px-3 xs:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 hover:bg-zinc-500 transition-all"
            onClick={goToPost}
          >
            <FaComments />
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
