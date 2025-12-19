import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (token, user) => {
    await AsyncStorage.setItem('access_token', token);
    set({ user, isAuthenticated: true });
  },
  logout: async () => {
    await AsyncStorage.removeItem('access_token');
    set({ user: null, isAuthenticated: false });
  },
}));





