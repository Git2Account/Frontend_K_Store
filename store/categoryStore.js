'use client';
import { create } from 'zustand';
import { APIURL } from '@/utils/api';

// const APIURL =  process.env.NEXT_PUBLIC_API_URL;
const useCategoryStore = create((set) => ({
  categories: [],
  category: null,
  loading: false,
  error: null,
  
  // Get all categories
  getCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/categories`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch categories');
      }
      
      set({ categories: data.categories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Get single category
  getCategory: async (id) => {
    set({ loading: true, error: null, category: null });
    try {
      const res = await fetch(`${APIURL}/api/categories/${id}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch category');
      }
      
      set({ category: data.category, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Admin - Create category
  createCategory: async (categoryData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create category');
      }
      
      set(state => ({
        categories: [...state.categories, data.category],
        loading: false
      }));
      
      return data.category;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Admin - Update category
  updateCategory: async (id, categoryData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update category');
      }
      
      set(state => ({
        categories: state.categories.map(c => 
          c.categoryId === id ? data.category : c
        ),
        category: data.category,
        loading: false
      }));
      
      return data.category;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Admin - Delete category
  deleteCategory: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${APIURL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete category');
      }
      
      set(state => ({
        categories: state.categories.filter(c => c.categoryId !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));

export default useCategoryStore;