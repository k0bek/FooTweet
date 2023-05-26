import React from 'react';

import { PostAttributes } from '@/types/next-auth';

import Header from '../header/Header';
import Post from '../post/Post';
import Wrapper from '../wrapper/Wrapper';
import CreatePostBar from './CreatePostBar';

interface HomeMainContentProps {
  posts: (typeof PostAttributes)[];
}

const HomeMainContent = ({ posts }: HomeMainContentProps) => {
  return (
    <Wrapper>
      <Header heading="Home" />
      <div className="flex flex-col items-center gap-5 justify-center p-12">
        <CreatePostBar />
        {posts &&
          posts.map((post) => {
            return (
              <Post
                username={post.username}
                postValue={post.postValue}
                id={post._id}
                data_time={post.data_time}
                quantityOfComments={post.comments ? post.comments.length : 0}
                retweeted={post.retweeted}
                key={post._id}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

export default HomeMainContent;
