import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='min-h-screen flex'>
      <aside className='w-64 bg-[#062E52] text-white flex flex-col p-6 space-y-6'>
        <h2 className='text-2xl font-bold'>JOM Auto</h2>

        <nav className='flex flex-col space-y-3 text-lg'>
          <Link
            href='/user/dashboard'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Dashboard
          </Link>

          <Link
            href='/user/bookings'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Booking
          </Link>

          <Link
            href='/user/settings'
            className='hover:bg-[#FACF04] rounded-lg px-3 py-2 transition'
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className='flex-1 bg-gray-100 p-8'>{children}</main>
    </section>
  );
}
