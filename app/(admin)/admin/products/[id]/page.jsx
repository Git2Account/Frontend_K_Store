'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProductStore from '@/store/productStore';
import useCategoryStore from '@/store/categoryStore';
import useAuthStore from '@/store/authStore';

export default function Page({ params }) {
  const { id: productId } = params;
  const router = useRouter();
  const { product, getProduct, updateProduct, createProduct } = useProductStore();
  const { categories, getCategories } = useCategoryStore();
  const { token } = useAuthStore();
  
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    mrp: '',
    discountamount: '',
    categoryId: '',
    image: null
  });
  
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    getCategories();
    if (productId && productId !== 'new') {
      getProduct(productId);
    }
  }, [getProduct, getCategories, productId]);
  
  useEffect(() => {
    if (product && productId !== 'new') {
      setFormData({
        productName: product.productName || '',
        description: product.description || '',
        mrp: product.mrp !== null ? String(product.mrp) : '',
        discountamount: product.discountamount !== null ? String(product.discountamount) : '',
        categoryId: product.categoryId ? String(product.categoryId) : '',
        image: null
      });
      if (product.imageUrl) {
        setPreviewImage(product.imageUrl);
      }
    } else if (productId === 'new') {
      setFormData({
        productName: '',
        description: '',
        mrp: '',
        discountamount: '',
        categoryId: '',
        image: null
      });
      setPreviewImage('');
    }
  }, [product, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('mrp', formData.mrp);
      formDataToSend.append('discountamount', formData.discountamount);
      formDataToSend.append('categoryId', formData.categoryId);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      if (productId !== 'new') {
        await updateProduct(productId, formDataToSend, token);
      } else {
        await createProduct(formDataToSend, token);
      }
      
      router.push('/admin/products');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {productId !== 'new' ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="mrp" className="block text-sm font-medium text-gray-700 mb-1">
              MRP *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">₹</span>
              <input
                type="number"
                id="mrp"
                name="mrp"
                min="0"
                step="0.01"
                value={formData.mrp}
                onChange={handleChange}
                className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="discountamount" className="block text-sm font-medium text-gray-700 mb-1">
              Discounted Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">₹</span>
              <input
                type="number"
                id="discountamount"
                name="discountamount"
                min="0"
                step="0.01"
                value={formData.discountamount}
                onChange={handleChange}
                className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-black file:text-white
                hover:file:bg-gray-800"
            />
          </div>
        </div>
        
        {previewImage && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
            <div className="border rounded-md p-2 max-w-xs">
              <img 
                src={previewImage} 
                alt="Product preview" 
                className="max-h-40 object-contain mx-auto"
              />
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}