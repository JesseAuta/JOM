'use client';

import Image from 'next/image';

export default function UeberUnsPage() {
  return (
    <main className='w-full bg-white'>
      {/* PAGE CONTAINER */}
      <div
        className='
          w-full
          px-4
          md:px-6
          lg:px-0
          lg:max-w-6xl
          xl:max-w-7xl
          mx-auto
        '
      >
        {/* ================= SEARCH ================= */}
        <section className='pt-6'>
          <div className='flex items-center gap-3 bg-gray-100 rounded-full px-5 py-3'>
            <Image src='/search.png' alt='Search' width={25} height={25} />
            <span className='text-sm md:text-base text-gray-400'>
              What are you looking for?
            </span>
          </div>
        </section>

        {/* ================= HERO ================= */}
        <section className='relative w-full mt-6'>
          <div className='relative w-full aspect-[16/9] sm:aspect-[16/7] lg:aspect-[13/5] overflow-hidden rounded-none lg:rounded-xl'>
            <Image
              src='/company.png'
              alt='JOM Auto Team'
              fill
              priority
              className='object-fit lg:object-inherit'
              sizes='(max-width: 1024px) 100vw, 1200px'
            />

            {/* Floating buttons */}
            <div className='absolute right-3 bottom-3 md:right-4 md:bottom-4 flex flex-col gap-2 md:gap-3'>
              <button className='w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition'>
                <Image src='/phone.png' alt='Call' width={25} height={25} />
              </button>
              <button className='w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition'>
                <Image src='/clock.png' alt='Time' width={30} height={30} />
              </button>
            </div>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className='py-10 grid grid-cols-1 lg:grid-cols-2 gap-14'>
          {/* LEFT */}
          <div>
            <h1 className='text-2xl md:text-3xl font-extrabold text-gray-900'>
              About Us
            </h1>
            <div className='w-33 h-2 bg-yellow-400 rounded-full mt-1 mb-5' />
            <div className='max-w-2xl mx-auto mt-0 md:mt-0'>
              <p className='bg-white rounded-2xl p-6 md:p-8 shadow-lg transition-all hover:shadow-[0_0_20px_rgba(255,206,0,0.6)] text-gray-700 text-sm md:text-base leading-relaxed'>
                Since our founding, we have stood for{' '}
                <strong className='font-semibold'>
                  professionalism, quality
                </strong>{' '}
                and <strong className='font-semibold'>trust</strong>. Our
                experienced team of qualified professionals works daily to
                complete all orders quickly, precisely, and on time. Customer
                satisfaction is always our top priority, and we are proud to
                have built a loyal customer base over the years. We are
                committed to providing you with the best possible service and
                look forward to welcoming you to our workshop soon.
              </p>
            </div>

            {/* Waiting Area */}
            <div className='mt-10'>
              <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full' />
                Comfortable waiting area
              </h2>

              <div className='relative h-[190px] md:h-[220px] rounded-xl overflow-hidden mb-6'>
                <Image
                  src='/office.png'
                  alt='Waiting Area'
                  fill
                  className='object-cover'
                />
              </div>
              <p className='mt-3 mb-4 bg-gray-300 hover:bg-yellow-100 rounded-full px-13 py-2 text-sm md:text-base font-semibold text-gray-900 max-w-ml cursor-pointer transition-all shadow-sm hover:shadow-md'>
                Here you can wait in peace while we take care of your vehicle.
              </p>

              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl'>
                {/* Sofa */}
                <li className='flex items-center gap-4 bg-blue-50 hover:bg-yellow-100 rounded-xl px-5 py-4 cursor-pointer transition-all shadow-sm hover:shadow-md'>
                  <div className='w-10 h-10 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0'>
                    <Image src='/sofa.png' alt='Sofa' width={20} height={20} />
                  </div>
                  <span className='text-sm md:text-base font-medium text-gray-900'>
                    cozy soft sofas
                  </span>
                </li>

                {/* TV */}
                <li className='flex items-center gap-4 bg-blue-50 hover:bg-yellow-100 rounded-xl px-5 py-2 cursor-pointer transition-all shadow-sm hover:shadow-md'>
                  <div className='w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0'>
                    <Image src='/play.png' alt='TV' width={20} height={20} />
                  </div>
                  <span className='text-sm md:text-base font-medium text-gray-900'>
                    Television for entertainment
                  </span>
                </li>

                {/* WiFi */}
                <li className='flex items-center gap-4 bg-blue-50 hover:bg-yellow-100 rounded-xl px-5 py-4 cursor-pointer transition-all shadow-sm hover:shadow-md'>
                  <div className='w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0'>
                    <Image src='/wifi.png' alt='WiFi' width={20} height={20} />
                  </div>
                  <span className='text-sm md:text-base font-medium text-gray-900'>
                    kostenloses WLAN
                  </span>
                </li>

                {/* Coffee */}
                <li className='flex items-center gap-4 bg-blue-50 hover:bg-yellow-100 rounded-xl px-5 py-4 cursor-pointer transition-all shadow-sm hover:shadow-md'>
                  <div className='w-10 h-10 rounded-full bg-yellow-800 flex items-center justify-center flex-shrink-0'>
                    <Image
                      src='/coffee.png'
                      alt='Coffee'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='text-sm md:text-base font-medium text-gray-900'>
                    Coffee machines with fresh coffee
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full' />
              Convenient delivery service
            </h2>

            <div className='relative h-[220px] md:h-[260px] rounded-xl overflow-hidden mb-5'>
              <Image
                src='/deliver.png'
                alt='Delivery Service'
                fill
                className='object-fit lg:object-inherit'
              />
            </div>
            <div className='max-w-2xl mx-auto mt-5 '>
              <p
                className='bg-white rounded-3xl p-4 md:p-8 
              shadow-[0_0_20px_rgba(255,206,0,0.6)] 
              text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl  italic font-medium'
              >
                For customers who don't have time to wait, we also offer a
                convenient pick-up and delivery service. Upon request, we will
                collect your car and return it to your home once the work is
                complete.
              </p>
              {/* Highlighted service heading */}
              <div className='mt-1 w-full flex justify-center'>
                <h2 className='w-full max-w-2xl bg-yellow-400 text-gray-900 text-center font-bold text-lg md:text-2xl py-6 md:py-8 rounded-2xl shadow-lg hover:bg-yellow-500 transition-all'>
                  JOM AUTO Service – Quality that you can rely on.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
