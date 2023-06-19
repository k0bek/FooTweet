import { useState } from 'react'
import { useQuery } from 'react-query'
import Loader from '@/components/loader/Loader'
import UsersToFollowItem from './UsersToFollowItem'
import { Button } from '@/components/Button'

const UsersToFollow = () => {
  const { isLoading, data: items } = useQuery('users', () => fetch('../api/users').then((res) => res.json()))
  const [visibleUsers, setVisibleUsers] = useState(3)

  const handleShowMore = () => {
    setVisibleUsers((prevCount) => prevCount + 3)
  }

  console.log(items)

  return (
    <div className="h-82 hidden min-w-[29rem] max-w-[29rem] rounded-2xl bg-gray-800 py-6 xl:block">
      <h2 className="px-4 text-3xl font-bold text-white">Who to follow</h2>
      <ul className="flex flex-col items-center py-5">
        {!isLoading && items ? (
          items
            .slice(0, visibleUsers)
            .map((item: { image: string; username: string; _id: string }) => (
              <UsersToFollowItem username={item.username} image={item.image} key={item.username} userId={item._id} />
            ))
        ) : (
          <Loader />
        )}
      </ul>
      {items && visibleUsers < items.length && (
        <Button theme="default" onClick={handleShowMore}>
          Show more
        </Button>
      )}
    </div>
  )
}

export default UsersToFollow
