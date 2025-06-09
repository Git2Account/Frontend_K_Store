import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'K_STORE || SHOP NOW',
  description: 'Welcome! To K_STORE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-poppins">{children}</body>
    </html>
  );
}
