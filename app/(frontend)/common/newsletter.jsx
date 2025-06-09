import React from 'react'

export default function newsletter() {
  return (
    <>
      {/* Call to Action */}
      <section className="py-8 md:py-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8">Get the latest updates on new products and upcoming sales</p>

          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l text-black"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-r font-semibold hover:bg-gray-200 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
