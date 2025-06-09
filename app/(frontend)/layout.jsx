'use client';
import Header from '@/app/(frontend)/common/header';
import Footer from '@/app/(frontend)/common/footer';

export default function FrontendLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}