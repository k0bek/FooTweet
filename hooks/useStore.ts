import { useSession } from 'next-auth/react'
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
  const session = useSession()
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ['user', userId],
    () => {
      if (session.data) {
        return fetch(`/api/users/${userId}`).then((res) => res.json())
      }
      return Promise.resolve(null)
    },
    { staleTime: Infinity }
  )

  return {
    user,
    isLoadingUser: isLoading,
    isError: error,
    refetchUser: refetch,
  }
}
