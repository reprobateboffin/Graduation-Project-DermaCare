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
  setIsAuthenticated: (value: boolean) => void;
  setToken: (token: string) => void;
  logout: () => Promise<void>; // Add logout to the interface
  initializeAuth: () => Promise<void>; // Add initializeAuth to the interface
}

// Create the store with the AuthState interface
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null, // Initialize token as null
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setToken: (token) => set((state) => ({ ...state, token })), // Preserve existing state
  logout: async () => {
    await AsyncStorage.removeItem('jwt_token');
    set({ isAuthenticated: false, token: null });
  },
  initializeAuth: async () => {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      set({ isAuthenticated: true, token });
    }
  },
}));