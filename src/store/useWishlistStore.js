import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
  wishlistItems: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],

  addToWishlist: (product) => {
    const { wishlistItems } = get();
    const existItem = wishlistItems.find((x) => x._id === product._id);

    let newItems;
    if (existItem) {
      // If it already exists, remove it (toggle behavior)
      newItems = wishlistItems.filter((x) => x._id !== product._id);
    } else {
      newItems = [...wishlistItems, product];
    }
    
    set({ wishlistItems: newItems });
    localStorage.setItem('wishlistItems', JSON.stringify(newItems));
    
    return !existItem; // return true if added, false if removed
  },

  removeFromWishlist: (id) => {
    const newItems = get().wishlistItems.filter((x) => x._id !== id);
    set({ wishlistItems: newItems });
    localStorage.setItem('wishlistItems', JSON.stringify(newItems));
  },
}));

export default useWishlistStore;
