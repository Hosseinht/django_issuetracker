import { create } from "zustand";
import { UserEmail } from "@/app/entities/User";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserEmail | null;
  login: (user: UserEmail) => void;
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

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store", useAuthStore);
}

export default useAuthStore;
