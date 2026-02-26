// 'use client';

// import { useState } from 'react';

// type Status = 'new' | 'in_progress' | 'done';

// interface Booking {
//   id: number;
//   carNumber: string;
//   service: string;
//   date: string;
//   master: string;
//   status: Status;
//   note?: string;
// }

// /*MOCK DATA*/

// const initialBookings: Booking[] = [
//   {
//     id: 101,
//     carNumber: 'B-AB1234',
//     service: 'Oil Change',
//     date: '2025-04-25 10:00',
//     master: 'Jesse',
//     status: 'new',
//   },
//   {
//     id: 102,
//     carNumber: 'HH-XY8899',
//     service: 'Tires',
//     date: '2025-04-25 12:00',
//     master: 'Olena',
//     status: 'in_progress',
//   },
//   {
//     id: 103,
//     carNumber: 'M-AA9999',
//     service: 'Diagnostics',
//     date: '2025-04-26 09:00',
//     master: 'Murphy',
//     status: 'done',
//   },
// ];

// export default function Dashboard() {
//   const [bookings, setBookings] = useState(initialBookings);

//   const [search, setSearch] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [masterFilter, setMasterFilter] = useState('');
//   const [serviceFilter, setServiceFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');

//   /* DELETE */

//   const deleteBooking = (id: number) => {
//     setBookings(bookings.filter((b) => b.id !== id));
//   };

//   /* FILTER LOGIC */

//   const filtered = bookings.filter((b) => {
//     return (
//       b.carNumber.toLowerCase().includes(search.toLowerCase()) &&
//       (dateFilter ? b.date.startsWith(dateFilter) : true) &&
//       (masterFilter ? b.master === masterFilter : true) &&
//       (serviceFilter ? b.service === serviceFilter : true) &&
//       (statusFilter ? b.status === statusFilter : true)
//     );
//   });

//   /* UNIQUE VALUES FOR FILTERS */

//   const masters = [...new Set(bookings.map((b) => b.master))];
//   const services = [...new Set(bookings.map((b) => b.service))];

//   return (
//     <div className='space-y-6'>
//       <h1 className='text-3xl font-semibold'>Dashboard</h1>

//       {/* SEARCH + FILTERS */}
//       <div className='bg-white p-6 rounded-xl shadow space-y-4'>
//         {/* SEARCH */}
//         <input
//           placeholder='Search by vehicle number...'
//           className='w-full border-amber-300 p-3 border rounded-lg'
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* FILTERS */}
//         <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
//           <input
//             type='date'
//             className='border p-2 rounded'
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//           />

//           <select
//             className='border p-2 rounded'
//             value={masterFilter}
//             onChange={(e) => setMasterFilter(e.target.value)}
//           >
//             <option value=''>All mechanics</option>
//             {masters.map((m) => (
//               <option key={m}>{m}</option>
//             ))}
//           </select>

//           <select
//             className='border p-2 rounded'
//             value={serviceFilter}
//             onChange={(e) => setServiceFilter(e.target.value)}
//           >
//             <option value=''>All services</option>
//             {services.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>

//           <select
//             className='border p-2 rounded'
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value=''>All statuses</option>
//             <option value='new'>New</option>
//             <option value='in_progress'>In prograss</option>
//             <option value='done'>Done</option>
//           </select>

//           <button
//             className='bg-gray-200 rounded p-2'
//             onClick={() => {
//               setSearch('');
//               setDateFilter('');
//               setMasterFilter('');
//               setServiceFilter('');
//               setStatusFilter('');
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className='bg-white rounded-xl shadow overflow-hidden'>
//         <table className='w-full text-sm'>
//           <thead className='bg-gray-100'>
//             <tr>
//               <th className='p-3 text-left'>№</th>
//               <th className='p-3 text-left'>Vehicle number</th>
//               <th className='p-3 text-left'>Service</th>
//               <th className='p-3 text-left'>Data & Time</th>
//               <th className='p-3 text-left'>Mechanic</th>
//               <th className='p-3 text-left'>Status</th>
//               <th className='p-3 text-left'>Note</th>
//               <th className='p-3'></th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((b) => (
//               <tr key={b.id} className='border-t'>
//                 <td className='p-3 font-medium'>{b.id}</td>

//                 <td className='p-3'>{b.carNumber}</td>

//                 <td className='p-3'>{b.service}</td>

//                 <td className='p-3'>{b.date}</td>

//                 <td className='p-3'>{b.master}</td>

//                 <td className='p-3'>
//                   <StatusBadge status={b.status} />
//                 </td>

//                 <td className='p-3'>
//                   <input
//                     className='border p-1 rounded w-full'
//                     placeholder='text...'
//                   />
//                 </td>

//                 <td className='p-3 flex gap-2'>
//                   <button className='text-blue-600'>Edit</button>
//                   <button
//                     className='text-red-600'
//                     onClick={() => deleteBooking(b.id)}
//                   >
//                     🗑
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: Status }) {
//   const styles = {
//     new: 'bg-yellow-200 text-yellow-800',
//     in_progress: 'bg-blue-200 text-blue-800',
//     done: 'bg-green-200 text-green-800',
//   };

//   const labels = {
//     new: 'New',
//     in_progress: 'Bei der Arbeit',
//     done: 'Fertig',
//   };

//   return (
//     <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>
//       {labels[status]}
//     </span>
//   );
// }

'use client';

import { useState } from 'react';

type Status = 'new' | 'in_progress' | 'done';

interface Booking {
  id: number;
  carNumber: string;
  service: string;
  date: string;
  master: string;
  status: Status;
  note?: string;
}

/*MOCK DATA*/

const initialBookings: Booking[] = [
  {
    id: 101,
    carNumber: 'B-AB1234',
    service: 'Oil Change',
    date: '2025-04-25 10:00',
    master: 'Jesse',
    status: 'new',
  },
  {
    id: 102,
    carNumber: 'HH-XY8899',
    service: 'Tires',
    date: '2025-04-25 12:00',
    master: 'Olena',
    status: 'in_progress',
  },
  {
    id: 103,
    carNumber: 'M-AA9999',
    service: 'Diagnostics',
    date: '2025-04-26 09:00',
    master: 'Murphy',
    status: 'done',
  },
];

export default function Dashboard() {
  const [bookings, setBookings] = useState(initialBookings);

  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [masterFilter, setMasterFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* DELETE */
  const deleteBooking = (id: number) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  /* FILTER LOGIC */
  const filtered = bookings.filter((b) => {
    return (
      b.carNumber.toLowerCase().includes(search.toLowerCase()) &&
      (dateFilter ? b.date.startsWith(dateFilter) : true) &&
      (masterFilter ? b.master === masterFilter : true) &&
      (serviceFilter ? b.service === serviceFilter : true) &&
      (statusFilter ? b.status === statusFilter : true)
    );
  });

  /* UNIQUE VALUES FOR FILTERS */
  const masters = [...new Set(bookings.map((b) => b.master))];
  const services = [...new Set(bookings.map((b) => b.service))];

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-semibold'>Dashboard</h1>

      {/* SEARCH + FILTERS */}
      <div className='bg-white p-6 rounded-xl shadow space-y-4'>
        {/* SEARCH */}
        <input
          placeholder='Search by vehicle number...'
          className='w-full border-amber-300 p-3 border rounded-lg'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTERS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3'>
          <input
            type='date'
            className='border p-2 rounded'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <select
            className='border p-2 rounded'
            value={masterFilter}
            onChange={(e) => setMasterFilter(e.target.value)}
          >
            <option value=''>All mechanics</option>
            {masters.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <select
            className='border p-2 rounded'
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value=''>All services</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            className='border p-2 rounded'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value=''>All statuses</option>
            <option value='new'>New</option>
            <option value='in_progress'>In progress</option>
            <option value='done'>Done</option>
          </select>

          <button
            className='bg-gray-200 rounded p-2'
            onClick={() => {
              setSearch('');
              setDateFilter('');
              setMasterFilter('');
              setServiceFilter('');
              setStatusFilter('');
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className='hidden md:block bg-white rounded-xl shadow overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-3 text-left'>№</th>
              <th className='p-3 text-left'>Vehicle number</th>
              <th className='p-3 text-left'>Service</th>
              <th className='p-3 text-left'>Date & Time</th>
              <th className='p-3 text-left'>Mechanic</th>
              <th className='p-3 text-left'>Status</th>
              <th className='p-3 text-left'>Note</th>
              <th className='p-3'></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className='border-t'>
                <td className='p-3 font-medium'>{b.id}</td>
                <td className='p-3'>{b.carNumber}</td>
                <td className='p-3'>{b.service}</td>
                <td className='p-3'>{b.date}</td>
                <td className='p-3'>{b.master}</td>
                <td className='p-3'>
                  <StatusBadge status={b.status} />
                </td>
                <td className='p-3'>
                  <input
                    className='border p-1 rounded w-full'
                    placeholder='text...'
                  />
                </td>
                <td className='p-3 flex gap-2'>
                  <button className='text-blue-600'>Edit</button>
                  <button
                    className='text-red-600'
                    onClick={() => deleteBooking(b.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className='md:hidden space-y-4'>
        {filtered.map((b) => (
          <div key={b.id} className='bg-white rounded-xl shadow p-4 space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg'>{b.carNumber}</span>
              <StatusBadge status={b.status} />
            </div>

            <div className='text-sm space-y-1'>
              <p>
                <span className='font-medium'>Service:</span> {b.service}
              </p>
              <p>
                <span className='font-medium'>Date:</span> {b.date}
              </p>
              <p>
                <span className='font-medium'>Mechanic:</span> {b.master}
              </p>
              <p>
                <span className='font-medium'>ID:</span> {b.id}
              </p>
            </div>

            <input
              className='border p-2 rounded w-full text-sm'
              placeholder='Add note...'
            />

            <div className='flex justify-between pt-2'>
              <button className='text-blue-600 text-sm'>Edit</button>
              <button
                className='text-red-600 text-sm'
                onClick={() => deleteBooking(b.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    new: 'bg-yellow-500 ',
    in_progress: 'bg-blue-400',
    done: 'bg-green-400',
  };

  const labels = {
    new: 'New',
    in_progress: 'In progress',
    done: 'Done',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
