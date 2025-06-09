'use client';
import Link from 'next/link';

export default function footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">K_STORE</h3>
              <p className="text-gray-300 mb-4">
                Your one-stop shop for the latest fashion trends.
              </p>
              <div className="flex space-x-4">
                {/* Instagram */}
                <Link href="#" aria-label="Instagram" className="text-white hover:text-pink-400">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                  </svg>
                </Link>

                {/* Credit Card */}
                <Link href="#" aria-label="Credit Card" className="text-white hover:text-blue-400">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2V6zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8zm4 4a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6z" />
                  </svg>
                </Link>

                {/* PayPal */}
                <Link href="#" aria-label="PayPal" className="text-white hover:text-blue-300">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M7.77 20.5 9.2 12h3.25c2.85 0 5.1-2.33 5.1-5.18A4.83 4.83 0 0 0 12.73 2H7.67L5.23 20.5h2.54zM17 8c0 2.48-1.96 4.5-4.56 4.5H9.81l-1.1 6h1.9l.26-1.5h1.42c1.68 0 3.05-1.13 3.34-2.74.67-.45 1.13-1.22 1.13-2.16 0-.61-.22-1.16-.57-1.6z" />
                  </svg>
                </Link>

                {/* Twitter */}
                <Link href="#" aria-label="Twitter" className="text-white hover:text-sky-400">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1s-1.64.96-2.6 1.26A4.52 4.52 0 0 0 16.62 0c-2.63 0-4.77 2.15-4.77 4.8 0 .38.04.75.12 1.1C7.69 5.73 4.06 3.8 1.64.9a4.73 4.73 0 0 0-.64 2.41c0 1.66.82 3.13 2.07 4A4.48 4.48 0 0 1 .96 7v.05a4.81 4.81 0 0 0 3.84 4.7 4.6 4.6 0 0 1-2.12.08 4.79 4.79 0 0 0 4.46 3.32A9.06 9.06 0 0 1 0 19.54a12.77 12.77 0 0 0 6.92 2.03c8.3 0 12.85-7.1 12.85-13.26 0-.2-.01-.41-.02-.61A9.44 9.44 0 0 0 23 3z" />
                  </svg>
                </Link>

                {/* Facebook */}
                <Link href="#" aria-label="Facebook" className="text-white hover:text-blue-500">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M22.68 0H1.32A1.31 1.31 0 0 0 0 1.32v21.36C0 23.41.59 24 1.32 24H12.82v-9.29H9.69V11.1h3.13V8.41c0-3.1 1.89-4.79 4.65-4.79 1.32 0 2.46.1 2.8.14v3.24h-1.92c-1.51 0-1.8.72-1.8 1.77v2.33h3.6l-.47 3.61h-3.13V24h6.13A1.31 1.31 0 0 0 24 22.68V1.32A1.31 1.31 0 0 0 22.68 0z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
                <li><Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
                <li><Link href="/cart" className="text-gray-300 hover:text-white">Cart</Link></li>
                <li><Link href="/checkout" className="text-gray-300 hover:text-white">Checkout</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                <li><Link href="/register" className="text-gray-300 hover:text-white">Register</Link></li>
                <li><Link href="/profile" className="text-gray-300 hover:text-white">My Account</Link></li>
                <li><Link href="/orders" className="text-gray-300 hover:text-white">My Orders</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">123 Fashion Street</li>
                <li className="text-gray-300">Jaipur Rajasthan, IND 302022</li>
                <li className="text-gray-300">Phone: 9611452676</li>
                <li className="text-gray-300">Email: info@k_store.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} K_STORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
