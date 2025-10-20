import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of your User
export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  userId: string | null;
  token: string | null;
  setUser: (user: User) => void;
  setUserId: (id: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      userId: null,
      token: null,

      setUser: user => set({ user }),
      setUserId: id => set({ userId: id }),
      setToken: token => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          Cookies.set('token', token, { expires: 7 });
        }
        set({ token });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          Cookies.remove('token');
        }
        set({ user: null, token: null, userId: null });
      },
    }),
    { name: 'auth-storage' }
  )
);
