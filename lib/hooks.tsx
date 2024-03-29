import { useQuery } from 'react-query'

export const useComments = (postId?: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetch(`/api/comments/${postId}`).then((res) => res.json()),
  })

  return {
    comments: data,
    isLoadingComments: isLoading,
    isError: error,
    refetchComments: refetch,
  }
}

export const useSinglePost = (postId?: string) => {
  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['singlePost', postId],
    queryFn: () => fetch(`/api/posts/${postId}`).then((res) => res.json()),
  })

  return {
    post,
    isLoadingSinglePost: isLoading,
    isError: error,
  }
}

export const useProfilePosts = (profileId?: string) => {
  const {
    isLoading,
    error,
    data: profilePosts,
    refetch: refetchProfilePosts,
  } = useQuery({
    queryKey: ['profilePosts', profileId],
    queryFn: () => fetch(`/api/profilePosts/${profileId}`).then((res) => res.json()),
  })

  return {
    profilePosts,
    isLoadingProfilePosts: isLoading,
    isError: error,
    refetchProfilePosts,
  }
}
