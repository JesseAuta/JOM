'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from 'react-icons/rx';
import MapModal from './MapModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Book appointment', href: '/booking' },
  ];

  const isActive = (path: string) =>
    pathname === path
      ? 'text-[#062E52] font-bold border-b-2 border-[#062E52]'
      : 'text-[#062E52] font-bold';

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md h-30 transition-all duration-300'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 h-full'>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/images/Logo.png'
            alt='JOM Auto Logo'
            width={180}
            height={50}
            className='object-contain cursor-pointer'
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${isActive(link.href)} relative group transition`}
            >
              <span className='relative z-10'>{link.name}</span>
              <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-[#062E52] transition-all group-hover:w-full'></span>
            </Link>
          ))}
        </nav>

        {/* Icons + Language Switcher + Mobile */}
        <div className='flex items-center gap-2 md:gap-4 text-sm'>
          {/* Location Icon */}
          <div className=' md:block'>
            <MapModal />
          </div>

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
            <div className='pt-2 flex justify-start'>
              <MapModal />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
