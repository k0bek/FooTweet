import 'react-loading-skeleton/dist/skeleton.css'

import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PostAttributes } from 'next-auth'

import Skeleton from 'react-loading-skeleton'

import lewy from '@/assets/images/lewy.jpg'
import Header from '@/components/header/Header'
import CreatePostBar from '@/components/homeMainContent/CreatePostBar'
import Loader from '@/components/loader/Loader'
import ChangeUserInfoModal from '@/components/modals/ChangeUserInfoModal'
import Post from '@/components/post/Post'
import Wrapper from '@/components/wrapper/Wrapper'
import { useModalStore } from '@/hooks/useStore'
import { useProfilePosts, useUser } from '@/lib/hooks'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { Button } from '@/components/Button'

const Profile = () => {
  const { profileId } = useRouter().query
  const { user, isLoadingUser, refetchUser } = useUser(profileId as string)
  const { profilePosts, isLoadingProfilePosts, refetchProfilePosts } = useProfilePosts(profileId as string)

  const [isUserInfoModalOpen, handleIsUserInfoModalOpen] = useModalStore((state) => [
    state.isUserInfoModalOpen,
    state.handleIsUserInfoModalOpen,
  ])

  return (
    <Wrapper>
      <Header heading="Profile" />
      <div className="h-60 bg-gray-700"></div>
      <div className="border-down flex w-full flex-col gap-10 border-b-2 border-gray-700 py-4">
        <div className="relative w-full p-4 md:p-7">
          {!isLoadingUser ? (
            <Image
              src={lewy}
              className="absolute left-5 top-[-5.5rem] h-32 w-32 rounded-full md:top-[-8rem] md:h-48 md:w-48"
              alt="Profile image"
            />
          ) : (
            <Skeleton circle width={105} height={105} className="absolute top-[-8.5rem] rounded-full md:top-[-8rem]" />
          )}

          <div className="absolute right-2 top-3 md:p-6">
            <Button theme="white" size="default" onClick={handleIsUserInfoModalOpen} disabled={isLoadingUser}>
              Edit profile
            </Button>
          </div>
        </div>
        <div className={`${'flex flex-col items-start px-8'} ${isLoadingUser && 'mt-[-10em]'}`}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start xs:gap-2">
              <span className="text-4xl font-semibold text-white md:text-5xl">
                {!isLoadingUser && user ? (
                  !user?.name ? (
                    user?.username
                  ) : (
                    user.name
                  )
                ) : (
                  <Skeleton width={150} height={30} />
                )}
              </span>
              <span className=" text-2xl font-medium text-gray-400">
                {!isLoadingUser && user ? `@${user.username}` : <Skeleton width={100} height={20} />}
              </span>
            </div>
            <span className="text-xl text-white md:text-2xl">
              {!isLoadingUser && user ? !user?.bio ? 'Bio is empty' : user.bio : <Skeleton width={150} height={20} />}
            </span>
            <span className="text-xl text-gray-400 md:text-2xl">
              {!isLoadingUser && user ? (
                `Joined ${moment(user?.data_time).format('MMMM Do YYYY')}`
              ) : (
                <Skeleton width={150} height={20} />
              )}
            </span>
          </div>
          <div className="mt-5 flex gap-5 text-white transition-all hover:text-gray-300">
            {!isLoadingUser && user ? (
              <>
                <p className="cursor-pointer text-xl md:text-2xl">
                  Following
                  <span className="ml-2 font-bold">123</span>
                </p>
                <p className="cursor-pointer text-xl transition-all hover:text-gray-300 md:text-2xl">
                  Followers
                  <span className="ml-2 font-bold">123</span>
                </p>
              </>
            ) : (
              <Skeleton width={200} height={30} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 px-5 py-10">
        <CreatePostBar refetchProfilePosts={refetchProfilePosts} />
        {profilePosts && !isLoadingProfilePosts ? (
          profilePosts.map((profilePost: PostAttributes) => {
            return (
              <Post
                postValue={profilePost.postValue}
                username={profilePost.username}
                data_time={profilePost.data_time}
                id={profilePost._id}
                key={profilePost._id}
                userId={profilePost.userId}
              />
            )
          })
        ) : (
          <Loader />
        )}
      </div>
      {isUserInfoModalOpen && <ChangeUserInfoModal refetchUser={refetchUser} />}
    </Wrapper>
  )
}

export default Profile

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permament: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
