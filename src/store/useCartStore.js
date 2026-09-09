import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      // Add item to cart
      addToCart: (product, qty) => {
        const item = {
          product: product._id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          countInStock: product.countInStock,
          qty: Number(qty)
        };

        const existingItem = get().cartItems.find((x) => x.product === item.product);

        if (existingItem) {
          set({
            cartItems: get().cartItems.map((x) =>
              x.product === existingItem.product ? item : x
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },

      // Remove item from cart
      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((x) => x.product !== id),
        });
      },

      // Clear cart
      clearCartItems: () => {
        set({ cartItems: [] });
      },

      // Get cart totals
      getCartTotals: () => {
        const itemsPrice = get().cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
        const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

        return {
          itemsPrice: itemsPrice.toFixed(2),
          shippingPrice: shippingPrice.toFixed(2),
          taxPrice: taxPrice.toFixed(2),
          totalPrice: totalPrice.toFixed(2)
        };
      }
    }),
    {
      name: 'auraluxe-cart-storage',
    }
  )
);

export default useCartStore;
