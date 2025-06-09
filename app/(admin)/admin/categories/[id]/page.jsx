'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCategoryStore from '@/store/categoryStore';
import useAuthStore from '@/store/authStore';

export default function Page({ params }) {
  const { id: categoryId } = params;
  const router = useRouter();
  const { category, getCategory, updateCategory, createCategory } = useCategoryStore();
  const { token } = useAuthStore();
  
  const [formData, setFormData] = useState({
    categoryName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (categoryId && categoryId !== 'new') {
      getCategory(categoryId);
    }
  }, [getCategory, categoryId]);
  
  useEffect(() => {
    if (category && categoryId !== 'new') {
      setFormData({
        categoryName: category.categoryName || ''
      });
    }
  }, [category, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (categoryId === 'new') {
        await createCategory(formData, token);
      } else {
        await updateCategory(categoryId, formData, token);
      }
      router.push('/admin/categories');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {categoryId === 'new' ? 'Create New Category' : 'Edit Category'}
      </h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </form>
    </div>
  );
}