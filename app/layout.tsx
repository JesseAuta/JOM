'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang='de'>
      <body className='flex min-h-screen flex-col' suppressHydrationWarning>
        <Header />
        <main className='flex-1'>{loading ? <Loader /> : children}</main>
        <Footer />
      </body>
    </html>
  );
}
