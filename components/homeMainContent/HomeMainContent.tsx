import React from 'react';

import Header from '../header/Header';
import Post from '../post/Post';
import Wrapper from '../wrapper/Wrapper';
import CreatePostBar from './CreatePostBar';

const HomeMainContent = ({ posts }) => {
  return (
    <Wrapper>
      <Header heading="Home" />
      <div className="flex flex-col items-center gap-5 justify-center p-12">
        <CreatePostBar />
        {posts &&
          posts.map((post) => {
            return (
              <Post username={post.username} postValue={post.postValue} id={post._id} />
            );
          })}
        {/* {isLoading && <Loader />} */}
      </div>
    </Wrapper>
  );
};

export default HomeMainContent;
