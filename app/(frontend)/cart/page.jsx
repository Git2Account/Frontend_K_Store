'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';

export default function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=checkout');
    } else {
      router.push('/checkout');
    }
  };

  // Calculate totals using Amazon-like logic
  const shipping = subtotal >= 499 ? 0 : 40;
  const tax = (subtotal + shipping) * 0.18; // 18% tax
  const orderTotal = subtotal + shipping + tax;

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Items in Your Cart</h2>
          </div>

          <div className="divide-y divide-gray-200">             
            {items.map((item) => (
              <div key={item.productId} className="p-6 flex flex-col sm:flex-row">
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 sm:ml-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      <Link href={`/products/${item.productId}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mb-4 sm:mb-0">
                      &#8377;{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center mb-4 sm:mb-0">
                      <label htmlFor={`quantity-${item.productId}`} className="block text-sm font-medium text-gray-700 mr-2">
                        Quantity:
                      </label>
                      <div className="flex rounded-md">
                        <button
                          type="button"
                          className="px-2 py-1 border border-gray-300 bg-gray-50 rounded-l-md text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id={`quantity-${item.productId}`}
                          min="1"
                          className="w-12 text-center border-t border-b border-gray-300 py-1 focus:outline-none focus:ring-0 focus:border-gray-300"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        />
                        <button
                          type="button"
                          className="px-2 py-1 border border-gray-300 bg-gray-50 rounded-r-md text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:text-red-800 flex items-center"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => clearCart()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Clear Cart
            </button>

            <Link href="/products" className="text-black hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Order Summary</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({totalItems} items)</span>
              <span className="text-gray-900 font-medium">&#8377;{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900 font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `Rs.${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax (estimated)</span>
              <span className="text-gray-900 font-medium">&#8377;{tax.toFixed(2)}</span>
            </div>

            {subtotal < 499 && (
              <div className="text-sm text-gray-500 py-2">
                Add <span className="font-medium text-green-600">&#8377;{(499 - subtotal).toFixed(2)}</span> more to qualify for free shipping
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Order Total</span>
                <span className="text-xl font-bold text-gray-900">
                  &#8377;{orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-6 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Secure
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3" />
                </svg>
                Easy returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}