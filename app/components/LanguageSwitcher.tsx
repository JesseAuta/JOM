'use client';

import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

type Language = 'DE' | 'EN';

const languages = [
  {
    code: 'EN' as Language,
    flag: 'https://flagcdn.com/w40/gb.png',
  },
  {
    code: 'DE' as Language,
    flag: 'https://flagcdn.com/w40/de.png',
  },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('EN');
  const [open, setOpen] = useState(false);

  const selected = languages.find((l) => l.code === language);

  return (
    <div className='relative inline-block'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 border border-yellow-400 rounded-lg px-3 py-2 bg-white shadow-sm text-blue-900 font-semibold'
      >
        <img
          src={selected?.flag}
          alt={selected?.code}
          className='w-6 h-6 rounded-full object-cover'
        />

        <span>{selected?.code}</span>

        <HiChevronDown className='text-blue-900' />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className='flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm text-blue-900'
            >
              <img
                src={lang.flag}
                alt={lang.code}
                className='w-6 h-6 rounded-full object-cover'
              />
              {lang.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
