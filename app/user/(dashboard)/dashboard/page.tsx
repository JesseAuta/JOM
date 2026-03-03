'use client';

import { useState } from 'react';

type Status = 'new' | 'in_progress' | 'done';

interface Booking {
  id: number;
  carNumber: string;
  carModel: string;
  carType: string;
  address: string;
  pickupOrDelivery: 'pickup' | 'delivery';
  service: string;
  date: string;
  master: string;
  status: Status;
  note?: string;
}

const initialBookings: Booking[] = [
  {
    id: 101,
    carNumber: 'B-AB1234',
    carModel: 'Toyota Camry',
    carType: 'Sedan',
    address: '123 Main St, City',
    pickupOrDelivery: 'pickup',
    service: 'Oil Change',
    date: '2025-04-25 10:00',
    master: 'Jesse',
    status: 'new',
    note: 'Customer requested synthetic oil',
  },
  {
    id: 102,
    carNumber: 'HH-XY8899',
    carModel: 'Honda CR-V',
    carType: 'SUV',
    address: '456 Oak Ave, City',
    pickupOrDelivery: 'delivery',
    service: 'Tires',
    date: '2025-04-25 12:00',
    master: 'Olena',
    status: 'in_progress',
  },
  {
    id: 103,
    carNumber: 'M-AA9999',
    carModel: 'BMW 320i',
    carType: 'Sedan',
    address: '789 Pine Rd, City',
    pickupOrDelivery: 'pickup',
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

  // ---------- EDIT MODAL ----------
  const [editBooking, setEditBooking] = useState<Booking | null>(null);

  const saveEdit = () => {
    if (!editBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === editBooking.id ? editBooking : b)),
    );
    setEditBooking(null);
  };

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const filtered = bookings.filter((b) => {
    return (
      b.carNumber.toLowerCase().includes(search.toLowerCase()) &&
      (dateFilter ? b.date.startsWith(dateFilter) : true) &&
      (masterFilter ? b.master === masterFilter : true) &&
      (serviceFilter ? b.service === serviceFilter : true) &&
      (statusFilter ? b.status === statusFilter : true)
    );
  });

  const masters = [...new Set(bookings.map((b) => b.master))];
  const services = [...new Set(bookings.map((b) => b.service))];

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-semibold'>Dashboard</h1>

      {/* SEARCH + FILTERS */}
      <div className='bg-white p-6 rounded-xl shadow space-y-4'>
        <input
          placeholder='Search by vehicle number...'
          className='w-full border-amber-300 p-3 border rounded-lg'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
              <th className='p-3 text-left'>Model</th>
              <th className='p-3 text-left'>Type</th>
              <th className='p-3 text-left'>Service</th>
              <th className='p-3 text-left'>Date & Time</th>
              <th className='p-3 text-left'>Mechanic</th>
              <th className='p-3 text-left'>Address</th>
              <th className='p-3 text-left'>Pickup/Delivery</th>
              <th className='p-3 text-left'>Note</th>
              <th className='p-3'></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className='border-t'>
                <td className='p-3 font-medium'>{b.id}</td>
                <td className='p-3'>{b.carNumber}</td>
                <td className='p-3'>{b.carModel}</td>
                <td className='p-3'>{b.carType}</td>
                <td className='p-3'>{b.service}</td>
                <td className='p-3'>{b.date}</td>
                <td className='p-3'>{b.master}</td>
                <td className='p-3'>{b.address}</td>
                <td className='p-3'>
                  {b.pickupOrDelivery === 'pickup' ? 'Pickup' : 'Delivery'}
                </td>
                <td className='p-3'>{b.note || '-'}</td>
                <td className='p-3 flex gap-2'>
                  <button
                    className='text-blue-600'
                    onClick={() => setEditBooking(b)}
                  >
                    Edit
                  </button>
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

      {/* EDIT MODAL */}
      {editBooking && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl w-96 space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Booking</h3>

            <input
              className='border p-2 rounded w-full'
              value={editBooking.carNumber}
              onChange={(e) =>
                setEditBooking({ ...editBooking, carNumber: e.target.value })
              }
              placeholder='Vehicle number'
            />

            <input
              className='border p-2 rounded w-full'
              value={editBooking.carModel}
              onChange={(e) =>
                setEditBooking({ ...editBooking, carModel: e.target.value })
              }
              placeholder='Model'
            />

            <input
              className='border p-2 rounded w-full'
              value={editBooking.carType}
              onChange={(e) =>
                setEditBooking({ ...editBooking, carType: e.target.value })
              }
              placeholder='Type'
            />

            <input
              className='border p-2 rounded w-full'
              value={editBooking.address}
              onChange={(e) =>
                setEditBooking({ ...editBooking, address: e.target.value })
              }
              placeholder='Address'
            />

            <select
              className='border p-2 rounded w-full'
              value={editBooking.pickupOrDelivery}
              onChange={(e) =>
                setEditBooking({
                  ...editBooking,
                  pickupOrDelivery: e.target.value as 'pickup' | 'delivery',
                })
              }
            >
              <option value='pickup'>Pickup</option>
              <option value='delivery'>Delivery</option>
            </select>

            <input
              className='border p-2 rounded w-full'
              value={editBooking.service}
              onChange={(e) =>
                setEditBooking({ ...editBooking, service: e.target.value })
              }
              placeholder='Service'
            />

            <input
              className='border p-2 rounded w-full'
              value={editBooking.date}
              onChange={(e) =>
                setEditBooking({ ...editBooking, date: e.target.value })
              }
              placeholder='Date & Time'
            />

            <input
              className='border p-2 rounded w-full'
              value={editBooking.master}
              onChange={(e) =>
                setEditBooking({ ...editBooking, master: e.target.value })
              }
              placeholder='Mechanic'
            />

            {/* Notes are read-only */}
            <p>
              <span className='font-medium'>Note:</span>{' '}
              {editBooking.note || '-'}
            </p>

            <div className='flex justify-end gap-3'>
              <button
                className='px-4 py-2 border rounded'
                onClick={() => setEditBooking(null)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-blue-600 text-white rounded'
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
