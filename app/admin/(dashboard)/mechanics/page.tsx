'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Mechanic {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  specialization: string;
}

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [newMechanic, setNewMechanic] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    specialization: '',
  });
  const [editMechanic, setEditMechanic] = useState<Mechanic | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const fetchMechanics = async () => {
  try {
    const res = await axios.get<Mechanic[]>(`${API}/api/mechanics`);
    setMechanics(res.data);
  } catch (err) {
    console.error('Error fetching mechanics', err);
  }
};

  useEffect(() => {
    fetchMechanics();
  }, []);

  const formatGermanPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('49')) {
      return (
        '+' +
        digits.slice(0, 2) +
        ' ' +
        digits.slice(2, 5) +
        ' ' +
        digits.slice(5, 12)
      );
    } else {
      return '+49 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 10);
    }
  };

  // Add mechanic via backend
  const addMechanic = async () => {
    if (
      !newMechanic.first_name ||
      !newMechanic.last_name ||
      !newMechanic.phone ||
      !newMechanic.specialization
    )
      return;
    try {
      const res = await axios.post<Mechanic>(
        'http://localhost:8000/api/mechanics',
        newMechanic,
      );
      setMechanics([...mechanics, res.data]);
      setNewMechanic({
        first_name: '',
        last_name: '',
        phone: '',
        specialization: '',
      });
    } catch (err) {
      console.error('Error adding mechanic', err);
    }
  };

  // Save edited mechanic via backend
  const saveMechanic = async () => {
    if (!editMechanic) return;
    try {
      await axios.put(
        `http://localhost:8000/api/mechanics/${editMechanic.id}`,
        editMechanic,
      );
      setMechanics(
        mechanics.map((m) => (m.id === editMechanic.id ? editMechanic : m)),
      );
      setEditMechanic(null);
    } catch (err) {
      console.error('Error updating mechanic', err);
    }
  };

  // Delete mechanic via backend
  const deleteMechanic = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this mechanic?'))
      return;
    try {
      await axios.delete(`http://localhost:8000/api/mechanics/${id}`);
      setMechanics(mechanics.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Error deleting mechanic', err);
    }
  };

  const isAddDisabled =
    !newMechanic.first_name ||
    !newMechanic.last_name ||
    !newMechanic.phone ||
    !newMechanic.specialization;
  const isEditDisabled =
    !editMechanic?.first_name ||
    !editMechanic?.last_name ||
    !editMechanic?.phone ||
    !editMechanic?.specialization;

  return (
    <div className='p-6 bg-gray-50 min-h-screen space-y-6'>
      <h1 className='text-3xl font-bold'>Mechanics</h1>

      {/* Add Mechanic */}
      <div className='flex flex-col md:flex-row gap-2 flex-wrap'>
        <input
          placeholder='First Name *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.first_name}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, first_name: e.target.value })
          }
        />
        <input
          placeholder='Last Name *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.last_name}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, last_name: e.target.value })
          }
        />
        <input
          placeholder='Phone *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.phone}
          onChange={(e) =>
            setNewMechanic({
              ...newMechanic,
              phone: formatGermanPhone(e.target.value),
            })
          }
        />
        <input
          placeholder='Specialization *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.specialization}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, specialization: e.target.value })
          }
        />
        <button
          className={`px-3 py-1 rounded text-white ${isAddDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={isAddDisabled}
          onClick={addMechanic}
        >
          Add
        </button>
      </div>

      {/* Mechanics List */}
      <div className='space-y-2 mt-4'>
        {mechanics.slice(0, visibleCount).map((m) => (
          <div
            key={m.id}
            className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-3 rounded shadow-sm gap-2'
          >
            <div>
              <p className='font-bold'>
                {m.first_name} {m.last_name}
              </p>
              <p>Phone: {m.phone}</p>
              <p>Specialization: {m.specialization}</p>
            </div>
            <div className='flex gap-2'>
              <button
                className='bg-blue-600 text-white px-3 py-1 rounded'
                onClick={() => setEditMechanic(m)}
              >
                Edit
              </button>
              <button
                className='bg-red-600 text-white px-3 py-1 rounded'
                onClick={() => deleteMechanic(m.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {visibleCount < mechanics.length && (
          <div className='flex justify-center mt-2'>
            <button
              className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editMechanic && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
          <div className='bg-white p-6 rounded-xl w-full max-w-md space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Mechanic</h3>
            <input
              placeholder='First Name *'
              className='border p-2 rounded w-full'
              value={editMechanic.first_name}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, first_name: e.target.value })
              }
            />
            <input
              placeholder='Last Name *'
              className='border p-2 rounded w-full'
              value={editMechanic.last_name}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, last_name: e.target.value })
              }
            />
            <input
              placeholder='Phone *'
              className='border p-2 rounded w-full'
              value={editMechanic.phone || ''}
              onChange={(e) =>
                setEditMechanic((prev) =>
                  prev ? { ...prev, phone: e.target.value } : prev,
                )
              }
            />
            <input
              placeholder='Specialization *'
              className='border p-2 rounded w-full'
              value={editMechanic.specialization}
              onChange={(e) =>
                setEditMechanic({
                  ...editMechanic,
                  specialization: e.target.value,
                })
              }
            />
            <div className='flex justify-end gap-3'>
              <button
                className='px-4 py-2 border rounded'
                onClick={() => setEditMechanic(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${isEditDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isEditDisabled}
                onClick={saveMechanic}
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
