'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';

export default function header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { totalItems } = useCartStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>

            {/* Pre-header */}
            <div className="bg-gradient-to-r from-blue-950 via-blue-700 to-orange-800 text-white py-2 text-center text-xs md:text-sm">
                <div className="flex items-center space-x-4 text-white">
                    <marquee className="hidden md:block text-xs" >
                        🛍️ Step into Elegance - Free Shipping on Orders Over $50 &nbsp;&nbsp;|&nbsp;&nbsp;
                        🔐 Shop with Confidence - Secure Checkout Guaranteed &nbsp;&nbsp;|&nbsp;&nbsp;
                        💎 Vintage Charm, Modern Quality &nbsp;&nbsp;|&nbsp;&nbsp;
                        🕰️ Timeless Pieces, Just a Click Away &nbsp;&nbsp;|&nbsp;&nbsp;
                        🎁 Exclusive Offers Unveiled Every Week &nbsp;&nbsp;|&nbsp;&nbsp;
                        💯 Satisfaction in Every Stitch - Guaranteed!
                    </marquee>
                </div>
            </div>


            {/* Header */}
            <header
                className={`sticky bg-white top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'shadow-xs'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-black">K_STORE</span>
                        </Link>

                        {/* Navigation - Desktop */}
                        <nav className="hidden md:flex space-x-8">
                            <Link href="/" className="text-gray-900 hover:text-orange-600 hover:underline px-3 py-1 font-medium">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-900 hover:text-orange-600 hover:underline px-3 py-1 font-medium">
                                Products
                            </Link>
                            <Link href="/categories" className="text-gray-900 hover:text-orange-600 hover:underline px-3 py-1 font-medium">
                                Categories
                            </Link>
                            <Link href="/contact" className="text-gray-900 hover:text-orange-600 hover:underline px-3 py-1 font-medium">
                                Contact
                            </Link>
                        </nav>

                        {/* User actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/cart" className="text-gray-900 hover:text-gray-600 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                <div className="relative group">
                                    <button className="flex items-center text-gray-900 hover:text-gray-600">
                                        <span className="mr-1">{user?.name}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            My Profile
                                        </Link>
                                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href="/login" className="text-gray-900 hover:text-gray-600">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-900"
                            >
                                {isMobileMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white p-4 shadow-md">
                        <nav className="flex flex-col space-y-4 mb-4">
                            <Link href="/" className="text-gray-900 hover:text-gray-600">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-900 hover:text-gray-600">
                                Products
                            </Link>
                            <Link href="/categories" className="text-gray-900 hover:text-gray-600">
                                Categories
                            </Link>
                            <Link href="/contact" className="text-gray-900 hover:text-gray-600">
                                Contact
                            </Link>
                            <Link href="/cart" className="text-gray-900 hover:text-gray-600 flex items-center">
                                Cart
                                {totalItems > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </nav>

                        {isAuthenticated ? (
                            <div className="border-t border-gray-200 pt-4">
                                <div className="text-gray-900 font-medium mb-2">{user?.name}</div>
                                <div className="space-y-2">
                                    <Link href="/profile" className="block text-gray-600">
                                        My Profile
                                    </Link>
                                    <Link href="/orders" className="block text-gray-600">
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block text-gray-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
                                <Link href="/login" className="text-gray-900 hover:text-gray-600">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-center">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </>
    )
}
