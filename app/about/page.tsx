'use client';

import Image from 'next/image';
import SearchBar from '../components/SearchBar';

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* PAGE CONTAINER */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* ================= HERO ================= */}
        <section className='relative w-full'>
          <div className='relative w-full aspect-[15/9] sm:aspect-[13/8] lg:aspect-[9/6] overflow-hidden rounded-none md:rounded-xl'>
            <Image
              src='/company.png'
              alt='JOM Auto Team'
              fill
              priority
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
            />

            {/* HERO STICKY ACTIONS */}
            <div className='absolute inset-y-0 right-3 sm:right-4 md:right-6 flex items-center z-20'>
              <div className='sticky top-[45%] -translate-y-1/2 flex flex-col gap-3'>
                {/* CALL ACTION */}
                <button
                  type='button'
                  aria-label='Contact us'
                  onClick={() => {
                    // later: open contact modal or route
                    console.log('Contact action');
                  }}
                  className='w-11 h-11 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center
                 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                 active:scale-95 transition'
                >
                  <Image src='/phone.png' alt='' width={25} height={25} />
                </button>

                {/* HOURS / INFO ACTION */}
                <button
                  type='button'
                  aria-label='Opening hours'
                  onClick={() => {
                    // later: open hours modal
                    console.log('Hours action');
                  }}
                  className='w-11 h-11 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center
                 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                 active:scale-95 transition'
                >
                  <Image src='/clock.png' alt='' width={30} height={30} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className='py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14'>
          {/* LEFT COLUMN */}
          <div>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
              About Us
            </h1>
            <div className='w-28 h-2 bg-blue-500 rounded-full mt-0 mb-0' />

            <p className='bg-white rounded-2xl p-5 sm:p-6 shadow-lg text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl'>
              Since our founding, we have stood for{' '}
              <strong>professionalism, quality</strong> and{' '}
              <strong>trust</strong>. Our experienced team works daily to
              complete all orders quickly, precisely, and on time. Customer
              satisfaction is always our top priority.
            </p>

            {/* Waiting Area */}
            <div className='mt-10'>
              <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full' />
                Comfortable waiting area
              </h2>

              <div className='relative h-44 sm:h-80 rounded-xl overflow-hidden mb-2'>
                <Image
                  src='/office.png'
                  alt='Waiting Area'
                  fill
                  className='object-cover'
                />
              </div>

              <div className='inline-flex max-w-full items-center gap-3 rounded-2xl sm:rounded-full bg-yellow-50 px-4 sm:px-6 py-2 shadow-sm'>
                <span className='h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400' />
                <p className='text-sm sm:text-base italic font-semibold text-gray-900 text-center sm:text-left'>
                  Comfort room for waiting customers.
                </p>
              </div>

              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mt-5'>
                {[
                  'Cozy, soft sofas',
                  'Television for entertainment',
                  'Free Wi-Fi',
                  'Coffee machines with fresh coffee',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2 text-sm sm:text-base text-gray-800'
                  >
                    <span className='text-yellow-400 font-bold'>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full' />
              Convenient delivery service
            </h2>

            <div className='relative h-48 sm:h-64 rounded-xl overflow-hidden mb-5'>
              <Image
                src='/deliver.png'
                alt='Delivery Service'
                fill
                className='object-cover'
              />
            </div>

            <p className='bg-white rounded-3xl p-4 sm:p-3 m-0 shadow-lg text-gray-700 text-sm sm:text-base italic leading-relaxed max-w-lg'>
              For customers who don't have time to wait, we offer a convenient
              pick-up and delivery service. Upon request, we collect your car
              and return it once the work is complete.
            </p>

            <div className='mt-10 flex justify-center'>
              <div className='w-full max-w-xl rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-7 text-center shadow-xl'>
                <p className='text-lg sm:text-2xl font-extrabold text-white tracking-wide'>
                  JOM AUTO Service
                </p>
                <span className='mt-2 block text-sm sm:text-base text-yellow-400 font-semibold'>
                  Quality you can rely on
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
