import 'react-loading-skeleton/dist/skeleton.css'

import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import Comment from '@/components/comment/Comment'
import CreateCommentBar from '@/components/createCommentBar/CreateCommentBar'
import Header from '@/components/header/Header'
import Loader from '@/components/loader/Loader'
import Post from '@/components/post/Post'
import Wrapper from '@/components/wrapper/Wrapper'
import { useComments, useSinglePost } from '@/lib/hooks'
import { CommentAttributes } from '@/types/next-auth'

const SinglePost = () => {
  const router = useRouter()
  const { postid } = router.query

  const { post, isLoadingSinglePost } = useSinglePost(postid as string)
  const { comments, isLoadingComments, refetchComments } = useComments(postid as string)

  return (
    <Wrapper>
      <Header heading="Post" />
      <div className="flex flex-col items-center gap-5 p-5">
        {!isLoadingSinglePost ? (
          <Post
            postValue={post.postValue}
            data_time={post.data_time}
            username={post.username}
            userId={post.userId}
            id={post._id}
            usersWhoLiked={post.usersWhoLiked}
            postImage={post.postImage}
          />
        ) : (
          <div className="h-full w-full rounded-2xl">
            <Skeleton width="100%" height={130} style={{ borderRadius: 10 }} />
          </div>
        )}
        <CreateCommentBar refetchComments={refetchComments} />
        {comments && !isLoadingComments ? (
          comments.map((comment: CommentAttributes) => {
            return (
              <Comment
                commentValue={comment.commentValue}
                data_time={comment.data_time}
                key={comment._id}
                userId={comment.userId}
              />
            )
          })
        ) : (
          <Loader />
        )}
      </div>
    </Wrapper>
  )
}

export default SinglePost
