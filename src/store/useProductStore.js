import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  
  // Fetch all products
  fetchProducts: async ({ keyword = '', pageNumber = '', category = '', sort = '' } = {}) => {
    set({ loading: true, error: null });
    try {
      let query = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`;
      if (category) query += `&category=${category}`;
      if (sort) query += `&sort=${sort}`;
      const { data } = await axios.get(query);
      set({ products: data.products, loading: false });
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },

  // Fetch single product
  fetchProductDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      set({ product: data, loading: false });
    } catch (error) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },

  // Create product review
  createReview: async (productId, review) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`/api/products/${productId}/reviews`, review);
      set({ loading: false });
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
}));

export default useProductStore;
