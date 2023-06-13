import 'react-loading-skeleton/dist/skeleton.css';

import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import lewy from '@/assets/images/lewy.jpg';
import Header from '@/components/header/Header';
import CreatePostBar from '@/components/homeMainContent/CreatePostBar';
import Loader from '@/components/loader/Loader';
import ChangeUserInfoModal from '@/components/modals/ChangeUserInfoModal';
import Post from '@/components/post/Post';
import Wrapper from '@/components/wrapper/Wrapper';
import { useProfilePosts, useUser } from '@/lib/hooks';
import { PostAttributes } from 'next-auth';
import { useModalStore } from '@/hooks/useStore';

const Profile = () => {
  const { profileId } = useRouter().query;
  const { user, isLoadingUser, refetchUser } = useUser(profileId as string);
  const { profilePosts, isLoadingProfilePosts, refetchProfilePosts } = useProfilePosts(
    profileId as string,
  );

  const [isUserInfoModalOpen, handleIsUserInfoModalOpen] = useModalStore((state) => [
    state.isUserInfoModalOpen,
    state.handleIsUserInfoModalOpen,
  ]);

  return (
    <Wrapper>
      <Header heading="Profile" />
      <div className="h-60 bg-gray-700"></div>
      <div className="w-full flex flex-col gap-10 border-down border-b-2 border-gray-700 py-4">
        <div className="relative w-full p-4 md:p-7">
          {!isLoadingUser ? (
            <Image
              src={lewy}
              className="rounded-full absolute top-[-5.5rem] md:top-[-8rem] left-5 h-32 w-32 md:w-48 md:h-48"
              alt="Profile image"
            />
          ) : (
            <Skeleton
              circle
              width={105}
              height={105}
              className="rounded-full absolute top-[-8.5rem] md:top-[-8rem]"
            />
          )}
          <button
            className="absolute right-2 top-3 border border-gray-600 text-xl xs:text-2xl py-3 px-3 xs:px-6 rounded-3xl text-black font-medium flex items-center gap-3 bg-white  disabled:bg-gray-500  transition-all"
            onClick={handleIsUserInfoModalOpen}
            disabled={isLoadingUser}
          >
            Edit profile
          </button>
        </div>
        <div
          className={`${'flex items-start px-8 flex-col'} ${
            isLoadingUser && 'mt-[-10em]'
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start flex-col xs:gap-2">
              <span className="text-white font-semibold text-4xl md:text-5xl">
                {!isLoadingUser && user ? (
                  !user?.name ? (
                    user?.username
                  ) : (
                    user.name
                  )
                ) : (
                  <Skeleton width={150} height={30} />
                )}
              </span>
              <span className=" text-gray-400 font-medium text-2xl">
                {!isLoadingUser && user ? (
                  `@${user.username}`
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </span>
            </div>
            <span className="text-white text-xl md:text-2xl">
              {!isLoadingUser && user ? (
                !user?.bio ? (
                  'Bio is empty'
                ) : (
                  user.bio
                )
              ) : (
                <Skeleton width={150} height={20} />
              )}
            </span>
            <span className="text-gray-400 text-xl md:text-2xl">
              {!isLoadingUser && user ? (
                `Joined ${moment(user?.data_time).format('MMMM Do YYYY')}`
              ) : (
                <Skeleton width={150} height={20} />
              )}
            </span>
          </div>
          <div className="flex gap-5 text-white mt-5 hover:text-gray-300 transition-all">
            {!isLoadingUser && user ? (
              <>
                <p className="text-xl md:text-2xl cursor-pointer">
                  Following
                  <span className="font-bold ml-2">123</span>
                </p>
                <p className="text-xl md:text-2xl cursor-pointer hover:text-gray-300 transition-all">
                  Followers
                  <span className="font-bold ml-2">123</span>
                </p>
              </>
            ) : (
              <Skeleton width={200} height={30} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10 px-5 items-center">
        <CreatePostBar refetchProfilePosts={refetchProfilePosts} />
        {profilePosts && !isLoadingProfilePosts ? (
          profilePosts.map((profilePost: PostAttributes) => {
            return (
              <Post
                postValue={profilePost.postValue}
                username={profilePost.username}
                data_time={profilePost.data_time}
                id={profilePost._id}
                key={profilePost._id}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      {isUserInfoModalOpen && <ChangeUserInfoModal refetchUser={refetchUser} />}
    </Wrapper>
  );
};

export default Profile;
