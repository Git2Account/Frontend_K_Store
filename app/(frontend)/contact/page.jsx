import Image from 'next/image';
import ContactImg from '@/public/img/contact-imgs.png';

const ContactUs = () => {
    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.21 11.72 11.72 0 003.67.58 1 1 0 011 1v3.58a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.6a1 1 0 011 1 11.72 11.72 0 00.58 3.67 1 1 0 01-.21 1.06l-2.35 2.35z" />
                </svg>
            ),
            title: "Customer Support",
            details: "+1 (512) 555-0199",
            description: "Monday to Friday: 9:00 AM - 6:00 PM CST",
            action: {
                text: "Call Now",
                href: "tel:+15125550199"
            }
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                </svg>
            ),
            title: "Email Us",
            details: "hello@k_store.com",
            description: "Average response time: 2 business hours",
            action: {
                text: "Send Email",
                href: "mailto:hello@alukas.com"
            }
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
            ),
            title: "Visit Our Showroom",
            details: "1100 Congress Ave, Austin, TX 78701",
            description: "Open by appointment Monday-Saturday",
            action: {
                text: "Get Directions",
                href: "https://maps.google.com?q=1100+Congress+Ave+Austin+TX+78701"
            }
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm1 11H7v-2h4V5h2z" />
                </svg>
            ),
            title: "Business Hours",
            details: "Customer Service Availability",
            description: "Mon-Fri: 9AM-6PM | Sat: 10AM-4PM | Sun: Closed",
            action: {
                text: "View Holiday Hours",
                href: "/business-hours"
            }
        }
    ];

    return (
        <div className="bg-white">
            {/* Main Contact Section */}
            <section className="max-w-7xl mx-auto px-4 py-8 text-xs">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Image */}
                    <div className="hidden md:block relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm">
                        <Image
                            src={ContactImg}
                            alt="Customer support team"
                            fill
                            className="object-contain"
                            placeholder="blur"
                            blurDataURL="/contact-placeholder.jpg"
                            priority
                        />
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg">
                        <form className="space-y-4">
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="(555) 123-4567"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    placeholder="How can we help you?"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                                <textarea
                                    id="message"
                                    required
                                    placeholder="Type your message here..."
                                    className="w-full p-3 min-h-[120px] resize-none rounded-lg border border-gray-200 hover:border-blue-400 transition-colors focus:outline-none placeholder-gray-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-sm bg-blue-950 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <div className="my-8 md:my-16 p-4 md:p-8 mx-auto bg-gray-50">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Other Ways to Reach Us</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                            <p className="text-gray-900 font-medium mb-1">{method.details}</p>
                            <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
