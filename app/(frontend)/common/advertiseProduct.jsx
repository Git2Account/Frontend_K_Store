import Link from 'next/link';
import React, { useState } from 'react';

export default function FurnitureShowcase() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white">

      <div className="flex py-8 md:py-16 justify-center bg-gradient-to-b from-stone-50 to-amber-50">
        <div className="container">
          <div className="bg-white grid grid-cols-1 gap-10 rounded-2xl border border-stone-200 p-6 shadow-lg lg:grid-cols-2 lg:px-16 lg:py-12">
            <div>
              <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800 mb-4">
                Premium Collections
              </div>
              <div className="flex flex-col justify-center items-center text-3xl font-bold lg:text-4xl">
                <h2 className="mb-4 text-stone-800">
                  Discover Our <span className="text-orange-600">Crafted Furniture</span>
                </h2>
              </div>

              <p className="text-stone-600 mb-6">
                Explore our handcrafted furniture collections that blend timeless design with exceptional comfort. Each piece is crafted using sustainable materials and traditional techniques.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-white hover:bg-amber-700 h-12 px-6 py-3 w-full sm:w-auto hover:scale-[1.03]"
                >
                  Browse Collections
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-arrow-right ml-2 size-4">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-stone-300 bg-white hover:bg-stone-100 hover:text-stone-800 h-12 px-6 py-3 w-full sm:w-auto hover:scale-[1.03]"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/categories/living-room">
                <div
                  className="rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-4 px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-amber-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-sofa size-6 text-amber-700">
                        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path>
                        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"></path>
                        <path d="M4 18v2"></path>
                        <path d="M20 18v2"></path>
                        <path d="M12 4v9"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-1 font-bold text-lg leading-4 text-stone-800 group-hover:text-amber-700">Living Room Collection</h5>
                      <p className="text-sm text-stone-600">
                        Comfortable sofas, elegant coffee tables, and stylish entertainment units
                      </p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-chevron-right size-6 text-stone-500 group-hover:text-amber-600">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </Link>
              <Link href="/categories/bedroom">
                <div
                  className="rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-4 px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-amber-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-bed size-6 text-amber-700">
                        <path d="M2 4v16"></path>
                        <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                        <path d="M2 17h20"></path>
                        <path d="M6 8v9"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-1 font-bold text-lg leading-4 text-stone-800 group-hover:text-amber-700">Bedroom Collection</h5>
                      <p className="text-sm text-stone-600">
                        Luxurious beds, spacious wardrobes, and elegant nightstands
                      </p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-chevron-right size-6 text-stone-500 group-hover:text-amber-600">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </Link>
              <Link href="/categories/dining-room">
                <div
                  className="rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-4 px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-amber-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-utensils-crossed size-6 text-amber-700">
                        <path d="m16 2-2 3h4l-2 3"></path>
                        <path d="M15 14v1"></path>
                        <path d="M15 19v2"></path>
                        <path d="M15 11v1"></path>
                        <path d="M3 3l18 18"></path>
                        <path d="M5.5 5.5 3 8v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-1 font-bold text-lg leading-4 text-stone-800 group-hover:text-amber-700">Dining Collection</h5>
                      <p className="text-sm text-stone-600">
                        Solid wood dining tables with comfortable, upholstered chairs
                      </p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-chevron-right size-6 text-stone-500 group-hover:text-amber-600">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* CTA */}
      <div className="py-16 bg-stone-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Home?</h2>
          <p className="text-amber-100 max-w-2xl mx-auto mb-4">
            Visit our showroom or schedule a virtual consultation with our design experts
          </p>
        </div>
      </div>
    </div>
  );
}