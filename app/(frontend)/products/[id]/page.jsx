'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useProductStore from '@/store/productStore';
import useCategoryStore from '@/store/categoryStore';
import useCartStore from '@/store/cartStore';

export default function ProductDetailsPage() {
  const { id } = useParams();
  console.log("id = ", id);
  const { product, loading, error, getProduct } = useProductStore();
  const { categories, getCategories } = useCategoryStore();
  const { addItem } = useCartStore();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    getProduct(id);
    getCategories();
  }, [id, getProduct, getCategories]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product.productId,
        name: product.productName,
        price: product.discountamount || product.mrp,
        image: product.imageUrl,
        quantity
      });
    }
  };
  
  const categoryName = product && categories?.find(c => c.categoryId === product.categoryId)?.categoryName;
  
  // Dummy images for showcase (in a real app, these would come from the product data)
  const productImages = product ? [
    product.imageUrl,
    'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2872879/pexels-photo-2872879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ] : [];
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-xl font-medium text-gray-600">Product not found</p>
          <Link href="/products" className="mt-4 inline-block text-black hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span className="mx-2">/</span>
        {categoryName && (
          <>
            <Link href={`/categories/${product.categoryId}`} className="hover:text-gray-900">
              {categoryName}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-900 font-medium">{product.productName}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 aspect-square">
            <img
              src={productImages[activeImage]}
              alt={product.productName}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex space-x-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-colors ${
                  activeImage === index ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          {categoryName && (
            <Link href={`/categories/${product.categoryId}`} className="text-sm font-medium text-blue-600 hover:underline">
              {categoryName}
            </Link>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.productName}</h1>
          
          <div className="flex items-baseline mb-6">
            {product.discountamount ? (
              <>
                <span className="text-3xl font-bold text-gray-900">&#8377;{product.discountamount}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">&#8377;{product.mrp}</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {product.discountPercent}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">&#8377;{product.mrp}</span>
            )}
          </div>
          
          {product.description && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Product Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Quantity Selector */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex rounded-md">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 bg-gray-50 rounded-l-md text-gray-500 hover:text-gray-700"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  className="flex-1 text-center border-t border-b border-gray-300 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 bg-gray-50 rounded-r-md text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Add to Cart
              </button>
              
              <Link
                href="/checkout"
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                Buy Now
              </Link>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span>Free shipping on orders over &#8377;50</span>
            </div>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Easy 30 days return policy</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span>Secure payment options</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}