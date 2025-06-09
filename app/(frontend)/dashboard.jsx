'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useCategoryStore from '@/store/categoryStore';
import useProductStore from '@/store/productStore';


import AdvertiseProduct from '@/app/(frontend)/common/advertiseProduct';
import NewsLetter from '@/app/(frontend)/common/newsletter';
import WhyChooseUs from '@/app/(frontend)/common/whyChooseUs';

export default function HomePage() {
  const { categories, getCategories } = useCategoryStore();
  const { products, getProducts } = useProductStore();

  console.log(getCategories);


  useEffect(() => {
    getCategories();
    getProducts(1, 8); // Get 8 products for the featured section
  }, [getCategories, getProducts]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-[url('/img/extraImg2.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">K_STORE Collection 2025</h1>
            <p className="text-lg sm:text-xl mb-8">Discover the latest trends in fashion and get up to 50% off on your first order.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products" className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition duration-300 text-center">
                Shop Now
              </Link>
              <Link href="/categories" className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-black transition duration-300 text-center">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className=" mx-auto py-8 md:py-16 bg-gray-50 justify-center">
        <div className="px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Shop By <span className="text-orange-600">Category</span>
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Explore a wide range of categories to find exactly what you need. Whether you're shopping for essentials or something unique, we've made it easier for you to discover the perfect items.
            </p>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.categoryId} 
              // href={`/categories/${category.categoryId}`}
              href="/categories"
              >
                <div className="group relative h-80 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200">
                    {category.imageUrl && (
                      <img
                        src={category.imageUrl}
                        alt={category.categoryName}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 md:inset-3 md:ml-32 rounded-xl bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-center text-xl font-bold">{category.categoryName}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/30 z-10"></div>
        <div
          className="absolute inset-0 bg-[url('/img/extraImg1.png')] bg-cover bg-center transform transition-all duration-1000 hover:scale-105"
        ></div>
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Crafted with Passion, Designed for Comfort
          </h1>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Discover our handcrafted furniture collections that transform houses into homes
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Explore Collections
          </button>
        </div>
      </div>

      <AdvertiseProduct />

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-8 md:py-16 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Featured <span className="text-orange-600">Products</span>
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Explore a wide range of categories to find exactly what you need. Whether you're shopping for essentials or something unique, we've made it easier for you to discover the perfect items.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((product) => (
              <div key={product.productId}
                class="relative overflow-hidden w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <Link href="#">
                  <img class="rounded-t-lg" src={product.imageUrl} alt={product.productName} />
                  {product.discountPercent && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discountPercent}
                    </div>
                  )}
                </Link>
                <div class="p-5">
                  <Link href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productName.split(" ").length > 6
                        ? product.productName.split(" ").slice(0, 6).join(" ") + "..."
                        : product.productName}
                    </h5>
                  </Link>

                  <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path
                          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    {product.couponText && (
                      <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {product.couponText}

                      </span>
                    )}
                  </div>
                  <div class="grid w-full items-center justify-between">
                    <div className="flex items-baseline mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        &#8377;{product.discountamount ? product.discountamount : product.mrp}
                      </span>
                      {product.discountamount && (
                        <span className="ml-2 text-sm text-gray-500 line-through">&#8377;{product.mrp}</span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.productId}`}
                      className="w-full block text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-300"
                    > Add to cart</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/products" className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      <NewsLetter />
      <WhyChooseUs />
    </>
  );
}