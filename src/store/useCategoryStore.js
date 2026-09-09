import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore';

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/categories');
      set({ categories: data, loading: false });
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },

  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const { userInfo } = useAuthStore.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/categories', categoryData, config);
      set((state) => ({ 
        categories: [...state.categories, data],
        loading: false 
      }));
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

  deleteCategory: async (id) => {
    try {
      const { userInfo } = useAuthStore.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/categories/${id}`, config);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id)
      }));
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message 
      });
      throw error;
    }
  }
}));

export default useCategoryStore;
