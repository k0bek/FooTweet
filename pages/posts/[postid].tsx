import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { useMutation } from 'react-query';

import Header from '@/components/header/Header';
import CreatePostBar from '@/components/homeMainContent/CreatePostBar';
import Wrapper from '@/components/wrapper/Wrapper';
import usePost from '@/hooks/usePost';

const postid = ({ data }) => {
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post(`/api/comments/${data._id}`, newPost);
    },
  });

  console.log(data);
  return (
    <Wrapper>
      <Header heading="Post" />
      <div className="flex flex-col gap-5 p-5">
        <CreatePostBar />
      </div>
    </Wrapper>
  );
};

export default postid;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postId = context?.params?.postId;
  const response = await usePost(postId);
  const data = await response.json();

  return { props: { data } };
}
