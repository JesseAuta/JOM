"use client";

import Image from "next/image";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
        
       
      {/* TOP ROW */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <div className="flex items-center h-20 overflow-hidden gap-10">
          <Image
            src="/images/logo.png"
            alt="JOM Auto Logo"
            width={200}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <button className="text-yellow-500 hover:text-yellow-600 transition">
  <IoLocationSharp size={26} />
</button>

          <button className="text-gray-700 hover:text-black transition">
            <RxHamburgerMenu size={28} />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 rounded-md border px-3 py-1.5 hover:bg-yellow-100 border-yellow-400 text-yellow-700"
            >
              <Image
                src="/images/de.png"
                alt="DE"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium">DE</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg overflow-hidden z-20">
                <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 transition">
                  <Image src="/images/en2.png" alt="EN" width={20} height={20} />
                  EN
                </button>
                <button className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 transition">
                  <Image src="/images/de.png" alt="DE" width={20} height={20} />
                  DE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="border-t bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <input
            type="text"
            placeholder="What services are you looking for?"
            className="w-full rounded-lg border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </header>
  );
}
