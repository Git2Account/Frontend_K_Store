import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      
      // Set user after login/register
      setUser: (userData) => {
        set({
          user: userData.user || userData.admin,
          token: userData.token,
          isAuthenticated: true,
          isAdmin: userData.admin ? true : false,
        });
      },
      
      // Logout user
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
      
      // Check if user is logged in
      checkAuth: () => {
        const state = useAuthStore.getState();
        return state.isAuthenticated && state.token;
      }
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
    }
  )
);

export default useAuthStore;