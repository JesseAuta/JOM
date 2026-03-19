'use client';

import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Status = 'new' | 'in_progress' | 'done';

interface Booking {
  id: number;
  numberPlate: string;
  carBrand: string;
  carModel: string;
  name: string;
  lastName: string;
  email: string;
  year: string;
  address: string;
  telephone: string;
  pickup: boolean;
  delivery: boolean;
  service: string;
  date: string;
  time: string;
  mechanic: string;
  status: Status;
  note?: string;
}

const initialBookings: Booking[] = [
  {
    id: 101,
    numberPlate: 'B-AB1234',
    carBrand: 'Toyota',
    carModel: 'Camry',
    name: 'John',
    lastName: 'Miller',
    year: '2020',
    email: 'john.miller@gmail.com',
    address: '123 Main St, City',
    telephone: '+49123456789',
    pickup: true,
    delivery: true,
    service: 'Oil Change',
    date: '2025-04-25',
    time: '10:00',
    mechanic: 'Jesse',
    status: 'new',
    note: 'Customer requested synthetic oil',
  },
  {
    id: 102,
    numberPlate: 'HH-XY8899',
    carBrand: 'Honda',
    carModel: 'CR-V',
    name: 'Anna',
    lastName: 'Schmidt',
    year: '2021',
    email: 'anna.schmidt@gmail.com',
    address: '456 Oak Ave, City',
    telephone: '+49111111111',
    pickup: false,
    delivery: false,
    service: 'Tires',
    date: '2025-04-25',
    time: '12:00',
    mechanic: 'Olena',
    status: 'in_progress',
  },
  {
    id: 103,
    numberPlate: 'M-AA9999',
    carBrand: 'BMW',
    carModel: '320i',
    name: 'Peter',
    lastName: 'Wagner',
    year: '2019',
    email: 'peter.wagner@gmail.com',
    address: '789 Pine Rd, City',
    telephone: '+49222222222',
    pickup: true,
    delivery: false,
    service: 'Diagnostics',
    date: '2025-04-26',
    time: '09:00',
    mechanic: 'Murphy',
    status: 'done',
  },
];
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [bookings, setBookings] = useState(initialBookings);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [masterFilter, setMasterFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pickupFilter, setPickupFilter] = useState('');
  const [editBooking, setEditBooking] = useState<Booking | null>(null);

  const filtersActive =
    search !== '' ||
    dateFilter !== '' ||
    masterFilter !== '' ||
    serviceFilter !== '' ||
    statusFilter !== '' ||
    pickupFilter !== '';

  const saveEdit = () => {
    if (!editBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === editBooking.id ? editBooking : b)),
    );
    setEditBooking(null);
  };

  const filtered = bookings.filter((b) => {
    const pickupMatch =
      pickupFilter === ''
        ? true
        : pickupFilter === 'pickup'
          ? b.pickup && !b.delivery
          : pickupFilter === 'delivery'
            ? !b.pickup && b.delivery
            : pickupFilter === 'both'
              ? b.pickup && b.delivery
              : pickupFilter === 'none'
                ? !b.pickup && !b.delivery
                : true;

    return (
      b.numberPlate.toLowerCase().includes(search.toLowerCase()) &&
      (dateFilter ? b.date.startsWith(dateFilter) : true) &&
      (masterFilter ? b.mechanic === masterFilter : true) &&
      (serviceFilter ? b.service === serviceFilter : true) &&
      (statusFilter ? b.status === statusFilter : true) &&
      pickupMatch
    );
  });

  const masters = [...new Set(bookings.map((b) => b.mechanic))];
  const services = [...new Set(bookings.map((b) => b.service))];

  return (
    <div className='space-y-6 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-semibold text-blue-900'>Dashboard</h1>

      {/* SEARCH + FILTERS */}
      <div className='bg-white p-6 rounded-xl shadow space-y-4'>
        <input
          placeholder='Search by number plate...'
          className='w-full border-amber-300 p-3 border rounded-lg'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3'>
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
          <select
            className='border p-2 rounded'
            value={pickupFilter}
            onChange={(e) => setPickupFilter(e.target.value)}
          >
            <option value=''>Pickup / Delivery</option>
            <option value='pickup'>Pickup</option>
            <option value='delivery'>Delivery</option>
            <option value='both'>Pickup & Delivery</option>
            <option value='none'>None</option>
          </select>
          <button
            className={`rounded px-4 py-2 transition ${
              filtersActive
                ? 'bg-blue-800 hover:bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!filtersActive}
            onClick={() => {
              setSearch('');
              setDateFilter('');
              setMasterFilter('');
              setServiceFilter('');
              setStatusFilter('');
              setPickupFilter('');
            }}
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className='lg:hidden space-y-4'>
        {filtered.map((b) => (
          <div key={b.id} className='bg-white rounded-xl shadow p-4 space-y-2'>
            <div className='flex justify-between items-center'>
              <div className='font-semibold'>{b.numberPlate}</div>
              <StatusBadge status={b.status} />
            </div>

            <div className='text-sm text-gray-600'>
              {b.carBrand} {b.carModel}
            </div>

            <div className='text-sm'>Year: {b.year}</div>

            <div className='text-sm'>
              {b.name} {b.lastName}
            </div>

            <div className='text-sm'>{b.service}</div>
            <div className='text-sm'>
              {b.date} • {b.time}
            </div>
            <div className='text-sm'>Mechanic: {b.mechanic}</div>

            <div className='flex justify-between items-center pt-2'>
              <button
                onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                className='text-gray-600'
              >
                {expandedId === b.id ? '▼' : '▶'}
              </button>

              <div className='flex gap-3'>
                <button
                  className='text-blue-600'
                  onClick={() => setEditBooking({ ...b })}
                >
                  Edit
                </button>
              </div>
            </div>

            {expandedId === b.id && (
              <div className='pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='font-semibold text-gray-500'>Address</p>
                  <p>{b.email}</p>
                </div>
                <div>
                  <p className='font-semibold text-gray-500'>Address</p>
                  <p>{b.address}</p>
                </div>

                <div>
                  <p className='font-semibold text-gray-500'>Telephone</p>
                  <p>{b.telephone}</p>
                </div>

                <div>
                  <p className='font-semibold text-gray-500'>
                    Pickup / Delivery
                  </p>
                  <p>
                    {b.pickup && b.delivery && 'Pickup & Delivery'}
                    {b.pickup && !b.delivery && 'Pickup'}
                    {!b.pickup && b.delivery && 'Delivery'}
                    {!b.pickup && !b.delivery && 'None'}
                  </p>
                </div>

                <div>
                  <p className='font-semibold text-gray-500'>Note</p>
                  <p>{b.note || '-'}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className='hidden lg:block bg-white rounded-xl shadow overflow-x-auto'>
        <table className='w-full text-sm min-w-[1000px] table-auto'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='p-3 w-10'></th>
              <th className='p-3'>№</th>
              <th className='p-3'>Number plate</th>
              <th className='p-3'>Brand</th>
              <th className='p-3'>Model</th>
              <th className='p-3'>Year</th>
              <th className='p-3'>Name</th>
              <th className='p-3'>Last name</th>
              <th className='p-3'>Service</th>
              <th className='p-3'>Date</th>
              <th className='p-3'>Time</th>
              <th className='p-3'>Mechanic</th>
              <th className='p-3'>Status</th>
              <th className='p-3 w-24'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <Fragment key={b.id}>
                <tr
                  className='border-t cursor-pointer hover:bg-gray-50'
                  onClick={() =>
                    setExpandedId(expandedId === b.id ? null : b.id)
                  }
                >
                  <td className='p-3 w-10'>
                    {expandedId === b.id ? '▼' : '▶'}
                  </td>
                  <td className='p-3 font-medium'>{b.id}</td>
                  <td className='p-3'>{b.numberPlate}</td>
                  <td className='p-3'>{b.carBrand}</td>
                  <td className='p-3'>{b.carModel}</td>
                  <td className='p-3'>{b.year}</td>
                  <td className='p-3'>{b.name}</td>
                  <td className='p-3'>{b.lastName}</td>
                  <td className='p-3'>{b.service}</td>
                  <td className='p-3'>{b.date}</td>
                  <td className='p-3'>{b.time}</td>
                  <td className='p-3'>{b.mechanic}</td>
                  <td className='p-3'>
                    <StatusBadge status={b.status} />
                  </td>
                  <td className='p-3 w-24'>
                    <button
                      className='text-blue-600 mr-2'
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditBooking({ ...b });
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>

                {expandedId === b.id && (
                  <tr className='bg-gray-50'>
                    <td colSpan={14} className='p-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
                        <div>
                          <p className='font-semibold text-gray-500'>Email</p>
                          <p>{b.email}</p>
                        </div>
                        <div>
                          <p className='font-semibold text-gray-500'>Address</p>
                          <p>{b.address}</p>
                        </div>
                        <div>
                          <p className='font-semibold text-gray-500'>
                            Telephone
                          </p>
                          <p>{b.telephone}</p>
                        </div>
                        <div>
                          <p className='font-semibold text-gray-500'>
                            Pickup / Delivery
                          </p>
                          <p>
                            {b.pickup && b.delivery && 'Pickup & Delivery'}
                            {b.pickup && !b.delivery && 'Pickup'}
                            {!b.pickup && b.delivery && 'Delivery'}
                            {!b.pickup && !b.delivery && 'None'}
                          </p>
                        </div>
                        <div>
                          <p className='font-semibold text-gray-500'>Note</p>
                          <p>{b.note || '-'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editBooking && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl w-full max-w-md mx-4 space-y-4 max-h-[90vh] overflow-y-auto'>
            <h3 className='text-lg font-semibold'>
              Edit Booking: {editBooking.numberPlate} ({editBooking.name}{' '}
              {editBooking.lastName})
            </h3>

            {/* DATE */}
            <input
              type='date'
              className='border p-2 rounded w-full'
              value={editBooking.date}
              onChange={(e) =>
                setEditBooking({ ...editBooking, date: e.target.value })
              }
            />

            {/* TIME SELECT */}
            <select
              className='border p-2 rounded w-full'
              value={editBooking.time}
              onChange={(e) =>
                setEditBooking({ ...editBooking, time: e.target.value })
              }
            >
              {/* time slots */}
              {[
                '09:00',
                '09:30',
                '10:00',
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              className='border p-2 rounded w-full'
              value={editBooking.status}
              onChange={(e) =>
                setEditBooking({
                  ...editBooking,
                  status: e.target.value as Status,
                })
              }
            >
              <option value='new'>New</option>
              <option value='in_progress'>In progress</option>
              <option value='done'>Done</option>
            </select>

            {/* NOTE */}
            <textarea
              className='border p-2 rounded w-full'
              value={editBooking.note || ''}
              onChange={(e) =>
                setEditBooking({ ...editBooking, note: e.target.value })
              }
              placeholder='Note'
              rows={3}
            />

            {/* ACTIONS */}
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
    new: 'bg-yellow-500',
    in_progress: 'bg-blue-400',
    done: 'bg-green-400',
  };

  const labels = {
    new: 'New',
    in_progress: 'In progress',
    done: 'Done',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs text-white ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
