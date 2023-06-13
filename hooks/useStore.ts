import { create } from 'zustand';

interface ModalState {
  isAuthModalOpen: boolean;
  handleIsAuthModalOpen: () => void;
  isUserInfoModalOpen: boolean;
  handleIsUserInfoModalOpen: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isAuthModalOpen: false,
  handleIsAuthModalOpen: () =>
    set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
  isUserInfoModalOpen: false,
  handleIsUserInfoModalOpen: () =>
    set((state) => ({ isUserInfoModalOpen: !state.isUserInfoModalOpen })),
}));
