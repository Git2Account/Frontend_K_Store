import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import APIURL from "../utils/api";


const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  
  // Handle both "$5000.00" and "₹5000.00" formats
  const cleaned = String(price).replace(/[^0-9.]/g, ''); // Keep decimal point
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,

      // Add item to cart
      addItem: (item) => {
        const itemPrice = parsePrice(item.price);
        const { items, subtotal } = get();
        const existingItem = items.find(i => i.productId === item.productId);
        
        if (existingItem) {
          const updatedItems = items.map(i => 
            i.productId === item.productId 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          );
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + 1,
            subtotal: subtotal + itemPrice
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1, price: itemPrice }], 
            totalItems: get().totalItems + 1,
            subtotal: subtotal + itemPrice
          });
        }
      },
      
      // Remove item from cart
      removeItem: (productId) => {
        const { items, subtotal } = get();
        const item = items.find(i => i.productId === productId);
        
        if (item) {
          const itemPrice = parsePrice(item.price);
          const itemTotal = itemPrice * item.quantity;
          
          set({
            items: items.filter(i => i.productId !== productId),
            totalItems: get().totalItems - item.quantity,
            subtotal: subtotal - itemTotal
          });
        }
      },
      
      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        const { items, subtotal } = get();
        const item = items.find(i => i.productId === productId);
        
        if (item) {
          const itemPrice = parsePrice(item.price);
          const oldItemTotal = itemPrice * item.quantity;
          const newItemTotal = itemPrice * quantity;
          
          const updatedItems = items.map(i => 
            i.productId === productId 
              ? { ...i, quantity } 
              : i
          );
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + (quantity - item.quantity),
            subtotal: subtotal - oldItemTotal + newItemTotal
          });
        }
      },
      
      // Clear cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0
        });
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;