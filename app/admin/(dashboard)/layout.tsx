'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiMenu, HiOutlineLogout, HiX } from 'react-icons/hi';
import axios from 'axios';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/logout`,
        {},
        { withCredentials: true },
      );

      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <section className='min-h-screen flex'>
      {/* DESKTOP SIDEBAR */}
      <aside className='hidden md:flex w-64 bg-[#062E52] text-white flex-col p-6'>
        <h2 className='text-2xl font-bold mb-6'>JOM Auto</h2>

        <nav className='flex flex-col space-y-3 text-lg'>
          <Link
            href='/admin/dashboard'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Dashboard
          </Link>

          <Link
            href='/admin/bookings'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Booking
          </Link>

          <Link
            href='/admin/services'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Services
          </Link>

          <Link
            href='/admin/mechanics'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Mechanics
          </Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className='mt-auto flex items-center justify-center gap-2 w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200'
        >
          <HiOutlineLogout size={20} />
          Logout
        </button>
      </aside>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#062E52] text-white p-6 flex flex-col transform transition-transform duration-300 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>JOM Auto</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <HiX size={28} />
          </button>
        </div>
        <nav className='flex flex-col space-y-3 text-lg mt-6'>
          <Link
            href='/admin/dashboard'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href='/admin/bookings'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
            onClick={() => setSidebarOpen(false)}
          >
            Booking
          </Link>

          <Link
            href='/admin/services'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
            onClick={() => setSidebarOpen(false)}
          >
            Services
          </Link>
          <Link
            href='/admin/mechanics'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
            onClick={() => setSidebarOpen(false)}
          >
            Mechanics
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className='mt-auto flex items-center justify-center gap-2 w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200'
        >
          <HiOutlineLogout size={20} />
          Logout
        </button>
      </div>

      {/* MOBILE TOGGLE BUTTON */}
      <button
        className='md:hidden fixed top-4 left-4 z-50 text-white bg-[#062E52] p-2 rounded-lg shadow'
        onClick={() => setSidebarOpen(true)}
      >
        <HiMenu size={28} />
      </button>

      {/* CONTENT */}
      <main className='flex-1 bg-gray-100 p-8'>{children}</main>

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </section>
  );
}
