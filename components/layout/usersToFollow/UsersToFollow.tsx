import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Loader from '@/components/loader/Loader';

import UsersToFollowItem from './UsersToFollowItem';

const UsersToFollow = () => {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery('users', () => fetch('../api/users').then((res) => res.json()));

  return (
    <div className="bg-gray-800 py-6 h-82 rounded-2xl hidden xl:block min-w-[26rem]">
      <h2 className="text-white font-bold text-3xl px-4">Who to follow</h2>
      <ul className="py-5 flex flex-col items-center">
        {!isLoading && items ? (
          items.map((item: { image: string; username: string }) => {
            return <UsersToFollowItem username={item.username} image="" />;
          })
        ) : (
          <Loader />
        )}
      </ul>
      <p className="text-blue-500 cursor-pointer mt-1 px-4 text-2xl">Show more</p>
    </div>
  );
};

export default UsersToFollow;
