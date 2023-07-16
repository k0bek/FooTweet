import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { create } from 'zustand'

interface ModalState {
  isAuthModalOpen: boolean
  handleIsAuthModalOpen: () => void
  isUserInfoModalOpen: boolean
  handleIsUserInfoModalOpen: () => void
  isFollowersFollowingModalOpen: boolean
  handleIsFollowersFollowingModalOpen: () => void
}

export const useModalStore = create<ModalState>()((set) => ({
  isAuthModalOpen: false,
  handleIsAuthModalOpen: () => set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
  isUserInfoModalOpen: false,
  handleIsUserInfoModalOpen: () => set((state) => ({ isUserInfoModalOpen: !state.isUserInfoModalOpen })),
  isFollowersFollowingModalOpen: false,
  handleIsFollowersFollowingModalOpen: () =>
    set((state) => ({ isFollowersFollowingModalOpen: !state.isFollowersFollowingModalOpen })),
}))

export const useUser = (userId: string) => {
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ['user', userId],
    async () => {
      if (userId) {
        return fetch(`/api/users/${userId}`).then((res) => res.json())
      }
      return Promise.resolve(null)
    },
    { staleTime: Infinity }
  )

  const userResult = useMemo(
    () => ({
      user,
      isLoadingUser: isLoading,
      isError: error,
      refetchUser: refetch,
    }),
    [user, isLoading, error, refetch]
  )

  return userResult
}
