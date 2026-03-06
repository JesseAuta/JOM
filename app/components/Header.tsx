"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Book appointment", href: "/booking" },
  ];

  const isActive = (path: string) =>
    pathname === path
      ? "text-[#062E52] font-bold border-b-2 border-[#062E52]"
      : "text-[#062E52] font-bold";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md h-20 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-full">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo2.png"
            alt="JOM Auto Logo"
            width={140}
            height={30}
            loading="eager"
            style={{ height: 'auto' }}
            className='object-contain cursor-pointer'
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 text-lg ga">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${isActive(link.href)} relative group transition`}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Modern underline hover effect */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#062E52] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Icons + Mobile */}
        <div className="flex items-center gap-2 md:gap-4 text-sm">
          {/* Location Icon */}
          <button className="text-yellow-500 hover:text-yellow-600 transition">
            <IoLocationSharp size={22} />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 hover:text-black transition md:hidden"
          >
            <RxHamburgerMenu size={24} />
          </button>

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-md border border-yellow-400 px-2 py-1 hover:bg-yellow-100 text-yellow-700 text-xs"
            >
              <Image src="/images/de.png" alt="DE" width={16} height={16} />
              DE
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-24 rounded-md border bg-white shadow-lg overflow-hidden z-20 text-xs">
                <button className="flex w-full items-center gap-1 px-2 py-1 hover:bg-gray-100 transition">
                  <Image src="/images/en2.png" alt="EN" width={16} height={16} />
                  EN
                </button>
                <button className="flex w-full items-center gap-1 px-2 py-1 hover:bg-gray-100 transition">
                  <Image src="/images/de.png" alt="DE" width={16} height={16} />
                  DE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="flex flex-col px-4 py-3 space-y-2 text-sm">
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