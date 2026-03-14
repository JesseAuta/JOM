'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { IoLocationSharp } from 'react-icons/io5';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function MapModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center text-yellow-500 hover:text-yellow-600 transition text-2xl"
      >
        <IoLocationSharp size={22} />
        <span className="absolute inline-flex w-full h-full rounded-full bg-yellow-400 opacity-50 animate-ping"></span>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-4xl p-6 relative h-[500px] md:h-[450px]">
           
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl hover:text-red-500 transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#062E52]">
              Our Garages in Berlin
            </h2>

            <div className="h-full">
              
              <LeafletMap focusHQ={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}