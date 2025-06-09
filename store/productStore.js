'use client';
import { create } from 'zustand';
import APIURL from "../utils/api";

// const APIURL =  process.env.NEXT_PUBLIC_API_URL;
console.log(APIURL)
const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  pages: 0,
  total: 0,
  
  getProducts: async (page = 1, limit = 10, categoryId = null) => {
    set({ loading: true, error: null });
    try {
      let url = `${APIURL}/api/products?page=${page}&limit=${limit}`;

      console.log("url",url);

      if (categoryId) url += `&categoryId=${categoryId}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
      
      set({ 
        products: data.products, 
        page: data.page,
        pages: data.pages,
        total: data.total,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  getProduct: async (id) => {
    set({ loading: true, error: null, product: null });
    try {
      const res = await fetch(`${APIURL}/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch product');
      set({ product: data.product, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
 createProduct: async (formData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create product');
      
      set(state => ({
        products: [data.product, ...state.products],
        loading: false
      }));
      return data.product;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateProduct: async (id, formData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update product');
      
      set(state => ({
        products: state.products.map(p => 
          p.productId === id ? data.product : p
        ),
        product: data.product,
        loading: false
      }));
      return data.product;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteProduct: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete product');
      
      set(state => ({
        products: state.products.filter(p => p.productId !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));

export default useProductStore;