'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MapSection from './components/MapSection';
import { FiSearch } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Service {
  id: number;
  name: string;
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(API + '/api/services')
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Search */}
      <div className='mt-6'>
        <SearchBar
          query={query}
          setQuery={setQuery}
          data={services.map((s) => s.name)}
          navigateToServices={true} // ✅ navigate on click
        />
      </div>

      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 py-10'>
        <h1
          className='text-4xl md:text-5xl font-extrabold tracking-tight'
          style={{ color: '#062E52' }}
        >
          Welcome to Our Auto Repair Service
        </h1>
        <p className='mt-2 text-lg text-gray-700 leading-relaxed'>
          Professional diagnostics, repairs, and maintenance.
        </p>

        <div className='w-full mt-4'>
          <Image
            src='/images/jom-hero.png'
            alt='JOM Auto Service Center'
            width={1600}
            height={900}
            className='rounded-lg shadow-md object-cover w-full'
            priority
          />
        </div>
      </div>

      {/* Map Section */}
      <MapSection />
    </>
  );
}
