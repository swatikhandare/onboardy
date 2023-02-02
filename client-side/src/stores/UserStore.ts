import { create } from "zustand";
import User from "../models/User";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: async (user) => {
    return set({ user });
  },
}));

export default useUserStore;
