'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoLocationSharp } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Book appointment', href: '/booking' },
  ];

  const isActive = (path: string) =>
    pathname === path
      ? 'text-[#062E52] font-bold border-b-2 border-[#062E52]'
      : 'text-[#062E52] font-bold';

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md py-3'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/images/Logo.png'
            alt='JOM Auto Logo'
            width={400}
            height={160}
            className='h-16 w-auto object-contain cursor-pointer'
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-lg'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${isActive(link.href)} relative group transition`}
            >
              <span className='relative z-10'>{link.name}</span>
              {/* Modern underline hover effect */}
              <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-[#062E52] transition-all group-hover:w-full'></span>
            </Link>
          ))}
        </nav>

        {/* Icons + Mobile */}
        <div className='flex items-center gap-2 md:gap-4 text-sm'>
          {/* Location Icon */}
          <button className='text-yellow-500 hover:text-yellow-600 transition p-2 rounded-full hover:bg-yellow-50'>
            <IoLocationSharp size={32} />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className='text-gray-700 hover:text-black transition md:hidden'
          >
            <RxHamburgerMenu size={24} />
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='md:hidden bg-white shadow-inner border-t'>
          <div className='flex flex-col px-4 py-3 space-y-2 text-sm'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`${isActive(link.href)} hover:text-[#062E52] transition`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
