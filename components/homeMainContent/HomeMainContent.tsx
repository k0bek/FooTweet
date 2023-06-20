import { PostAttributes } from '@/types/next-auth'
import Header from '../header/Header'
import Post from '../post/Post'
import Wrapper from '../wrapper/Wrapper'
import CreatePostBar from './CreatePostBar'

interface HomeMainContentProps {
  posts: (typeof PostAttributes)[]
}

const HomeMainContent = ({ posts }: HomeMainContentProps) => {
  return (
    <Wrapper>
      <Header heading="Home" />
      <div className="flex flex-col items-center justify-center gap-5 p-12">
        <CreatePostBar />
        {posts &&
          posts.map((post: PostAttributes) => {
            return (
              <Post
                username={post.username}
                postValue={post.postValue}
                id={post._id}
                data_time={post.data_time}
                key={post._id}
                userId={post.userId}
                usersWhoLiked={post.usersWhoLiked}
              />
            )
          })}
      </div>
    </Wrapper>
  )
}

export default HomeMainContent
