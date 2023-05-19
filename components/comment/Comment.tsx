import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';

import lewy from './../../assets/images/lewy.jpg';
interface PostProps {
  username: string;
  commentValue: string;
  id: string;
  isComment: boolean;
  data_time: string;
  quantityOfComments: number;
  retweeted: boolean;
}

const Comment = ({ username, commentValue, id, data_time, retweeted }: PostProps) => {
  return (
    <div className="flex flex-col bg-slate-700 rounded-2xl w-full p-7 cursor-pointer hover:bg-slate-700/90 transition-all">
      <span className="font-medium xs:text-xl text-gray-200 px-5 mb-5">
        {retweeted && (
          <div className="flex items-center gap-3">
            <AiOutlineRetweet />
            Retweeted
          </div>
        )}
      </span>
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
                <span className="text-gray-400 xs:text-xl">
                  {moment(data_time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow()}
                </span>
              </div>
            </div>

            <p className="text-white text-lg xs:text-2xl">{commentValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
