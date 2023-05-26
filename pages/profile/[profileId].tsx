import moment from 'moment';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';

import lewy from '@/assets/images/lewy.jpg';
import Header from '@/components/header/Header';
import CreatePostBar from '@/components/homeMainContent/CreatePostBar';
import ChangeUserInfoModal from '@/components/modals/ChangeUserInfoModal';
import Post from '@/components/post/Post';
import Wrapper from '@/components/wrapper/Wrapper';
import useProfilePosts from '@/hooks/useProfilePosts';
import useUser from '@/hooks/useUser';
import { Session, User } from '@/types/next-auth';

interface ProfileProps {
  userSession: Session;
  profilePosts: User[];
}

const Profile = ({ userSession, profilePosts }: ProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((prev) => {
      return !prev;
    });
  };
  return (
    <Wrapper>
      <Header heading="Profile" />
      <div className="h-60 bg-gray-700"></div>
      <div className="w-full flex flex-col gap-10 border-down border-b-2 border-gray-700 py-4">
        <div className="relative w-full p-4 md:p-7">
          <Image
            src={lewy}
            className="rounded-full absolute top-[-5.5rem] md:top-[-8rem] left-5 h-32 w-32 md:w-48 md:h-48"
            alt="Profile image"
          />
          <button
            className="absolute right-2 top-3 border border-gray-600 text-xl xs:text-2xl py-3 px-3 xs:px-6 rounded-3xl text-black font-medium flex items-center gap-3 bg-white transition-all"
            onClick={handleModal}
          >
            Edit profile
          </button>
        </div>
        <div className="flex items-start px-8 flex-col">
          <div className="flex flex-col gap-6">
            <div className="flex items-start flex-col xs:gap-2">
              <span className="text-white font-semibold text-4xl md:text-5xl">
                {userSession.name === undefined ? userSession.username : userSession.name}
              </span>
              <span className=" text-gray-400 font-medium text-2xl">
                @{userSession.username}
              </span>
            </div>
            <span className="text-white text-xl md:text-2xl">
              {!userSession.bio ? 'Bio is empty' : userSession.bio}
            </span>
            <span className="text-gray-400 text-xl md:text-2xl">
              Joined {moment(userSession.data_time).format(`MMMM Do YYYY`)}
            </span>
          </div>
          <div className="flex gap-5 text-white mt-5 hover:text-gray-300 transition-all">
            <p className="text-xl md:text-2xl cursor-pointer">
              Following
              <span className="font-bold ml-2">123</span>
            </p>
            <p className="text-xl md:text-2xl cursor-pointer hover:text-gray-300 transition-all">
              Followers
              <span className="font-bold ml-2">123</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10 px-5">
        <CreatePostBar />
        {profilePosts &&
          profilePosts.map((profilePost) => {
            return (
              <Post
                postValue={profilePost.postValue}
                username={profilePost.username}
                data_time={profilePost.data_time}
                id={profilePost._id}
                quantityOfComments={
                  profilePost.comments ? profilePost.comments.length : 0
                }
                key={profilePost.id}
              />
            );
          })}
      </div>
      {isModalOpen && <ChangeUserInfoModal handleModal={handleModal} />}
    </Wrapper>
  );
};

export default Profile;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const userSession = await useUser(context.query.profileId as string);

  const profilePosts = await useProfilePosts(userSession?._id as string);

  if (!userSession) {
    return {
      redirect: {
        destination: '/',
        permament: false,
      },
    };
  }

  return {
    props: { userSession, profilePosts },
  };
};
