import { create } from "zustand";

interface User {
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  setLoading: (loading) => set({ isLoading: loading }),
  login: (user) => set((state) => ({ isAuthenticated: true, user })),
  logout: () => set(() => ({ isAuthenticated: false, user: null })),
}));

export default useAuthStore;
