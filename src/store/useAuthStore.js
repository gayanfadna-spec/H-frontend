import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      set({ userInfo: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('/api/users', { name, email, password });
      set({ userInfo: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
      throw error;
    }
  },

  updateProfile: async (user) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put('/api/users/profile', user);
      set({ userInfo: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/users/logout');
    } catch (error) {
      console.error('Logout error', error);
    }
    set({ userInfo: null });
    localStorage.removeItem('userInfo');
  },
}));

export default useAuthStore;
