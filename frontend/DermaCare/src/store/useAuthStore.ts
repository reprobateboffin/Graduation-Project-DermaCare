// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';

// interface AuthState {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (value: boolean) => void;
//   setToken: (token:string) =>void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   setIsAuthenticated: (value) => set({ isAuthenticated: value }),

//   setToken: (token) => set({ token }),
//   logout: async () => {
//     await AsyncStorage.removeItem('jwt_token');
//     set({ isAuthenticated: false, token: null });
//   },
//   initializeAuth: async () => {
//     const token = await AsyncStorage.getItem('jwt_token');
//     if (token) {
//       set({ isAuthenticated: true, token });
//     }
//   },
  

// })); 



import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// Define the full interface for the store
interface AuthState {
  isAuthenticated: boolean;
  token: string | null; // Add token to the state
  refreshToken: string | null; // Add token to the state
  setIsAuthenticated: (value: boolean) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken:string) => void;
  logout: () => Promise<void>; // Add logout to the interface
  initializeAuth: () => Promise<void>; // Add initializeAuth to the interface
}

// Create the store with the AuthState interface
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  token: null, // Initialize token as null
  refreshToken: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setToken: (token) => set((state) => ({ ...state, token , isAuthenticated:true})), // Preserve existing state
  logout: async () => {
    await AsyncStorage.removeItem('jwt_token');
    set({ isAuthenticated: false, token: null });
  },
  setRefreshToken: (refreshToken) => set({ refreshToken }),

  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        // If token exists, restore authenticated state
        set({ isAuthenticated: true, token });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isAuthenticated: false, token: null }); // Reset on error
    }
  },
}));