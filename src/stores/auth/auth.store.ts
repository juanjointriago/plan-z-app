import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
}

interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  cedula: string;
  gender: string;
  profilePhoto?: any;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, accept any username/password
          const mockUser: User = {
            id: '1',
            username,
            firstName: 'Usuario',
            lastName: 'Test',
            email: `${username}@plantz.com`,
          };
          
          set({ user: mockUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const newUser: User = {
            id: '1',
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: `${userData.username}@plantz.com`,
            profilePhoto: userData.profilePhoto,
          };
          
          set({ user: newUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);