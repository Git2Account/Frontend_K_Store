import { create } from 'zustand';

// Added parsePrice function for consistency
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  const cleaned = String(price).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const APIURL =  process.env.NEXT_PUBLIC_API_URL;

const useOrderStore = create((set) => ({
  orders: [],
  order: null,
  loading: false,
  error: null,
  page: 1,
  pages: 0,
  total: 0,
  
  // Get all orders (admin) or user orders
  getOrders: async (token, page = 1, limit = 10, userId = null, status = null) => {
    set({ loading: true, error: null });
    try {
      let url = `${APIURL}/api/orders?page=${page}&limit=${limit}`;
      if (userId) url += `&userId=${userId}`;
      if (status) url += `&status=${status}`;
      
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }
      
      set({ 
        orders: data.orders, 
        page: data.page,
        pages: data.pages,
        total: data.total,
        loading: false 
      });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Get single order
  getOrder: async (id, token) => {
    set({ loading: true, error: null, order: null });
    try {
      const res = await fetch(`${APIURL}/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch order');
      }
      
      set({ order: data.order, loading: false });
      return data.order;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Create order
 createOrder: async (orderData, token) => {
    set({ loading: true, error: null });
    try {
      // Calculate shipping and tax on frontend
      const subtotal = orderData.orderItems.reduce(
        (sum, item) => sum + (parsePrice(item.price) * item.quantity), 
        0
      );
      
      const shipping = subtotal > 499 ? 0 : 40;
      const tax = (subtotal + shipping) * 0.18; // 18% tax
      const orderTotal = subtotal + shipping + tax;

      const res = await fetch(`${APIURL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...orderData,
          subtotal,
          shipping,
          tax,
          orderTotal,
          // Parse all prices in order items
          orderItems: orderData.orderItems.map(item => ({
            ...item,
            price: parsePrice(item.price)
          }))
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create order');
      }
      
      set({ order: data.order, loading: false });
      return data.order;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Update order status (admin)
  updateOrderStatus: async (id, status, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update order status');
      }
      
      set(state => ({
        orders: state.orders.map(o => 
          o._id === id ? { ...o, status } : o
        ),
        order: state.order?._id === id ? { ...state.order, status } : state.order,
        loading: false
      }));
      
      return data.order;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Cancel order
  cancelOrder: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/orders/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to cancel order');
      }
      
      set(state => ({
        orders: state.orders.map(o => 
          o._id === id ? { ...o, status: 'Cancelled' } : o
        ),
        order: state.order?._id === id ? { ...state.order, status: 'Cancelled' } : state.order,
        loading: false
      }));
      
      return data.order;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Reset order state
  resetOrder: () => {
    set({
      order: null,
      loading: false,
      error: null
    });
  }
}));

export default useOrderStore;