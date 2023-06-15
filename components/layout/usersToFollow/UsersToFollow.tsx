import { useQuery } from 'react-query'
import Loader from '@/components/loader/Loader'
import UsersToFollowItem from './UsersToFollowItem'

const UsersToFollow = () => {
  const { isLoading, data: items } = useQuery('users', () => fetch('../api/users').then((res) => res.json()))

  return (
    <div className="h-82 hidden min-w-[26rem] max-w-[26rem] rounded-2xl bg-gray-800 py-6 xl:block">
      <h2 className="px-4 text-3xl font-bold text-white">Who to follow</h2>
      <ul className="flex flex-col items-center py-5">
        {!isLoading && items ? (
          items.map((item: { image: string; username: string }) => {
            return <UsersToFollowItem username={item.username} image="" key={item.username} />
          })
        ) : (
          <Loader />
        )}
      </ul>
      <p className="mt-1 cursor-pointer px-4 text-2xl text-blue-500">Show more</p>
    </div>
  )
}

export default UsersToFollow
