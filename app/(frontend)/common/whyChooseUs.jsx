import React from 'react'

export default function whyChooseUs() {
    return (
        <>
            {/* Features */}
            <div className="py-20 bg-gradient-to-b from-stone-50 to-amber-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800 mb-6">
                            Why Choose Us
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Craftsmanship That Matters</h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            Our commitment to quality and sustainability sets us apart in the furniture industry
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800 mb-3">Premium Materials</h3>
                            <p className="text-stone-600">
                                We source only the finest sustainable woods and eco-friendly fabrics to create furniture that lasts for generations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800 mb-3">Custom Designs</h3>
                            <p className="text-stone-600">
                                Our artisans can customize any piece to fit your unique space and style preferences.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800 mb-3">Lifetime Guarantee</h3>
                            <p className="text-stone-600">
                                We stand behind our craftsmanship with a comprehensive lifetime guarantee on all furniture joints and structures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
