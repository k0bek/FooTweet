import axios from 'axios';

import HomeMainContent from '@/components/homeMainContent/HomeMainContent';

import { PostAttributes } from './../types/next-auth';

interface HomeProps {
  posts: PostAttributes[];
}

export default function Home({ posts }: HomeProps) {
  return <HomeMainContent posts={posts} />;
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:3000/api/posts');

    const posts = await response.data.posts;

    return {
      props: { posts },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { posts: [] },
    };
  }
}
