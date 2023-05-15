import Header from '@/components/header/Header';
import Wrapper from '@/components/wrapper/Wrapper';
import Image from 'next/image';
import React from 'react';
import lewy from './../../assets/images/lewy.jpg';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import useUser from '@/hooks/useUser';
import Post from '@/components/post/Post';
import moment from 'moment';

const Profile = ({ userSession, usersPosts }) => {
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
          <button className="absolute right-2 top-3 border border-gray-600 text-xl xs:text-2xl py-3 px-3 xs:px-6 rounded-3xl text-black font-medium flex items-center gap-3 bg-white transition-all">
            Edit profile
          </button>
        </div>
        <div className="flex items-start px-8 flex-col">
          <div className="flex flex-col gap-6">
            <div className="flex items-start flex-col xs:gap-2">
              <span className="text-white font-semibold text-4xl md:text-5xl">
                {userSession.username}
              </span>
              <span className=" text-gray-400 font-medium text-2xl">
                @{userSession.username}
              </span>
            </div>
            <span className="text-white text-xl md:text-2xl">
              2020asdddddddddddddddddd
            </span>
            <span className="text-gray-400 text-xl md:text-2xl">
              Joined {moment().format(`MMMM Do YYYY`, userSession.data_time)}
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
      <div>
        {usersPosts &&
          usersPosts.map((userPost) => {
            return <Post isComment={false} postValue={userPost.postValue} />;
          })}
      </div>
    </Wrapper>
  );
};

export default Profile;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req });
  const userSession = session?.user;
  const usersPosts = await useUser(context?.params?.profileId);

  if (!userSession) {
    return {
      redirect: {
        destination: '/',
        permament: false,
      },
    };
  }

  return {
    props: { userSession, usersPosts },
  };
};
