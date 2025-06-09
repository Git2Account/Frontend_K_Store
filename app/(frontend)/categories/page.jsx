"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useCategoryStore from '@/store/categoryStore';
import useProductStore from '@/store/productStore';

export default function CategoriesPage() {
    const { categories, loading: categoriesLoading, error: categoriesError, getCategories } = useCategoryStore();
    const { products, loading: productsLoading, error: productsError, getProducts } = useProductStore();
    const [activeCategory, setActiveCategory] = useState('all');
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [masonryData, setMasonryData] = useState([]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        if (activeCategory === 'all') {
            getProducts(1, 1000);
        } else {
            getProducts(1, 1000, activeCategory);
        }
    }, [activeCategory, getProducts]);

    useEffect(() => {
        if (products && products.length > 0) {
            setCategoryProducts(products);

            // Prepare masonry grid data
            const masonryItems = products.slice(0, 6).map(product => ({
                ...product,
                imageUrl: product.imageUrl
            }));

            setMasonryData(masonryItems);
        } else {
            setCategoryProducts([]);
            setMasonryData([]);
        }
    }, [products]);

    return (
        <>
            <section className="py-10 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                            Browse Products by Category
                        </h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            Explore our curated collection of furniture pieces that seamlessly blend functionality with beautiful design
                        </p>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-5 py-2 rounded-full transition-all duration-300 ${activeCategory === 'all'
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                    }`}
                            >
                                All Collections
                            </button>

                            {categories.map(category => (
                                <button
                                    key={category.categoryId}
                                    onClick={() => setActiveCategory(category.categoryId)}
                                    className={`px-5 py-2 rounded-full transition-all duration-300 ${activeCategory === category.categoryId
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                        }`}
                                >
                                    {category.categoryName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {productsLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {productsError && (
                        <div className="bg-red-50 text-center text-red-700 p-4 rounded-md">
                            {productsError}
                        </div>
                    )}

                    {/* Masonry Grid */}
                    {!productsLoading && !productsError && masonryData.length > 0 && (
                        <div className="container mx-auto">
                            <div className="-m-1 flex flex-wrap md:-m-2">
                                {/* Left Column */}
                                <div className="flex w-1/2 flex-wrap">
                                    <div className="w-1/2 p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-full">
                                            <img
                                                alt={masonryData[0].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[0].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[0].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[0].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-full">
                                            <img
                                                alt={masonryData[1].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[1].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[1].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[1].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-64">
                                            <img
                                                alt={masonryData[2].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[2].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[2].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[2].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="flex w-1/2 flex-wrap">
                                    <div className="w-full p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-64">
                                            <img
                                                alt={masonryData[3].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[3].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[3].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[3].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-full">
                                            <img
                                                alt={masonryData[4].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[4].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[4].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[4].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-1 md:p-2">
                                        <div className="overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl relative group h-full">
                                            <img
                                                alt={masonryData[5].productName}
                                                className="block h-full w-full rounded-lg object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                src={masonryData[5].imageUrl}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                <Link
                                                    href={`/products/${masonryData[5].productId}`}
                                                    className="flex text-center px-1 md:px-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {masonryData[5].productName}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!productsLoading && !productsError && categoryProducts.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">
                                {activeCategory === 'all' ? 'All Products' : `All ${categories.find(c => c.categoryId === activeCategory)?.categoryName} Products`}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {categoryProducts.map((product) => (
                                    <div key={product.productId} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                        <Link href={`/products/${product.productId}`} className="block rounded-lg relative h-64 overflow-hidden">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.productName}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </Link>
                                        <div className="p-4">
                                            <Link href={`/products/${product.productId}`}>
                                                <h3 className="text-lg font-medium mb-2 text-gray-900 group-hover:text-black truncate">
                                                    {product.productName}
                                                </h3>
                                                <div className="flex items-baseline mb-2">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        &#8377;{product.discountamount || product.mrp}
                                                    </span>
                                                    {product.discountamount && (
                                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                                            &#8377;{product.mrp}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!productsLoading && !productsError && categoryProducts.length === 0 && (
                        <div className="text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <p className="mt-4 text-xl font-medium text-gray-600">No products found</p>
                            <p className="mt-2 text-gray-500">Try changing your category filter</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center py-12 md:py-20">
                    <div className="container px-4">
                        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6">
                            <div className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800">
                                Artisan Craftsmanship
                            </div>
                            <h2 className="mb-2 text-center text-3xl font-bold lg:text-4xl text-stone-800">
                                Where Quality Meets Comfort
                            </h2>
                            <p className="text-center text-stone-600 lg:text-lg">
                                For over two decades, we've been crafting furniture that combines timeless design with unparalleled comfort.
                                Each piece is meticulously handcrafted using sustainable materials and traditional techniques passed down through generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

        </>
    );
}