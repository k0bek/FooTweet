import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import Comment from '@/components/comment/Comment';
import CreateCommentBar from '@/components/createCommentBar/CreateCommentBar';
import Header from '@/components/header/Header';
import Post from '@/components/post/Post';
import Wrapper from '@/components/wrapper/Wrapper';
import useComments from '@/hooks/useComments';
import usePost from '@/hooks/usePost';

const postid = ({ commentedPost, comments }) => {
  console.log(commentedPost);
  return (
    <Wrapper>
      <Header heading="Post" />
      <div className="flex flex-col gap-5 p-5">
        <Post
          postValue={commentedPost.postValue}
          data_time={commentedPost.data_time}
          username={commentedPost.username}
          quantityOfComments={comments.length}
        />
        <CreateCommentBar commentedPost={commentedPost} />
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                username={comment.username}
                commentValue={comment.commentValue}
                data_time={comment.data_time}
                username={comment.username}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

export default postid;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postId = context?.params?.postId;
  const commentedPost = await usePost(postId);
  const comments = await useComments(postId);

  return { props: { commentedPost, comments } };
}
