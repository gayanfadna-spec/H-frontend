import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  
  // Fetch all products
  fetchProducts: async (keyword = '', pageNumber = '') => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
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
}));

export default useProductStore;
