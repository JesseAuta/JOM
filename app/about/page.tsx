'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* PAGE CONTAINER */}
      <div className="w-full px-4 md:px-6 lg:px-0 lg:max-w-6xl xl:max-w-7xl mx-auto">

        {/* ================= HERO ================= */}
        <section className="relative w-full mt-0">
          <div className="relative w-full aspect-[13/9] sm:aspect-[13/8] lg:aspect-[11/7] overflow-hidden rounded-none lg:rounded-xl">
            <Image
              src="/company.png"
              alt="JOM Auto Team"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />

            {/* Floating buttons */}
    <div className="absolute right-3 md:right-4 flex flex-col gap-2 md:gap-3 z-20 bottom-16 md:bottom-20 lg:bottom-24"
     style={{ bottom: '100px', top: '90px' }}>
  <button className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition">
    <Image src="/phone.png" alt="Call" width={18} height={18} />
  </button>

  <button className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition">
    <Image src="/clock.png" alt="Time" width={18} height={18} />
  </button>
</div>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* LEFT */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              About Us
            </h1>
            <div className="w-32 h-2 bg-yellow-400 rounded-full mt-1 mb-5" />
              
           
            <p className="bg-white rounded-2xl p-6 md:p-8 shadow-lg transition-all hover:shadow-[0_0_20px_rgba(255,206,0,0.6)] text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl">
              Since our founding, we have stood for{' '}
              <strong className="font-semibold">professionalism, quality</strong>{' '}
              and <strong className="font-semibold">trust</strong>. Our experienced
              team works daily to complete all orders quickly, precisely, and on
              time. Customer satisfaction is always our top priority.
            </p>
          
            {/* Waiting Area */}
            <div className="mt-10">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                Comfortable waiting area
              </h2>

              <div className="relative h-[190px] md:h-[285px] rounded-xl overflow-hidden mb-6">
                <Image
                  src="/office.png"
                  alt="Waiting Area"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mb-2 bg-gray-200 hover:bg-yellow-100 rounded-full px-19 py-0 text-sm md:text-base font-semibold text-gray-900 max-w-1lg cursor-pointer transition-all shadow-sm hover:shadow-md">
                Here you can wait in peace while we take care of your vehicle.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mt-4">
                {[
                  'Cozy, soft sofas',
                  'Television for entertainment',
                  'Free Wi-Fi',
                  'Coffee machines with fresh coffee',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm md:text-base text-gray-800"
                  >
                    <span className="mt-1 text-yellow-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
              Convenient delivery service
            </h2>

            <div className="relative h-[220px] md:h-[290px] rounded-xl overflow-hidden mb-5">
              <Image
                src="/deliver.png"
                alt="Delivery Service"
                fill
                className="object-cover"
              />
            </div>

            <p className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_0_20px_rgba(255,206,0,0.6)] text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl italic font-medium">
              For customers who don't have time to wait, we offer a convenient
              pick-up and delivery service. Upon request, we collect your car and
              return it once the work is complete.
            </p>

            <div className="mt-6 flex justify-center">
              <h2 className="w-full max-w-2xl bg-gray-400 text-gray-900 text-center font-bold text-lg md:text-2xl py-6 md:py-8 rounded-2xl shadow-lg hover:bg-yellow-200 transition-all">
                JOM AUTO Service – Quality you can rely on.
              </h2>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}