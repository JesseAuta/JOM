'use client';

import { useState } from 'react';

interface Mechanic {
  id: number;
  name: string;
  surname: string;
  phone: string;
  specialization: string;
  services?: string[];
}

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      phone: '+49 123 4567890',
      specialization: 'Engine',
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      phone: '+49 987 6543210',
      specialization: 'Tires',
    },
  ]);

  const [editMechanic, setEditMechanic] = useState<Mechanic | null>(null);
  const [newMechanic, setNewMechanic] = useState({
    name: '',
    surname: '',
    phone: '',
    specialization: '',
  });

  const [visibleCount, setVisibleCount] = useState(5);

  const formatGermanPhone = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as +49 XXX XXXXXX
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

  const addMechanic = () => {
    const id = Date.now();
    setMechanics([...mechanics, { id, ...newMechanic }]);
    setNewMechanic({ name: '', surname: '', phone: '', specialization: '' });
  };

  const saveMechanic = () => {
    if (!editMechanic) return;
    setMechanics((prev) =>
      prev.map((m) => (m.id === editMechanic.id ? editMechanic : m)),
    );
    setEditMechanic(null);
  };

  const deleteMechanic = (id: number) => {
    const mechanic = mechanics.find((m) => m.id === id);
    if (!mechanic) return;
    if (
      window.confirm(
        `Are you sure you want to delete mechanic ${mechanic.name} ${mechanic.surname}?`,
      )
    ) {
      setMechanics((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const isAddDisabled =
    !newMechanic.name ||
    !newMechanic.surname ||
    !newMechanic.phone ||
    !newMechanic.specialization;

  const isEditDisabled =
    !editMechanic?.name ||
    !editMechanic?.surname ||
    !editMechanic?.phone ||
    !editMechanic?.specialization;

  return (
    <div className='p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold'>Mechanics</h1>

      {/* ===== Add new mechanic (moved to top) ===== */}
      <div className='flex flex-col md:flex-row gap-2 md:gap-2 flex-wrap'>
        <input
          placeholder='Name *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.name}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, name: e.target.value })
          }
        />
        <input
          placeholder='Surname *'
          className='border px-2 py-1 rounded w-full md:w-auto'
          value={newMechanic.surname}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, surname: e.target.value })
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
          onClick={addMechanic}
          disabled={isAddDisabled}
        >
          Add
        </button>
      </div>

      {/* ===== Mechanics List ===== */}
      <div className='space-y-2'>
        {mechanics.slice(0, visibleCount).map((m) => (
          <div
            key={m.id}
            className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-3 rounded shadow-sm gap-2'
          >
            <div>
              <p className='font-bold'>
                {m.name} {m.surname}
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
          <div className='flex justify-center mt-4'>
            <button
              className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* ===== Edit Modal ===== */}
      {editMechanic && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
          <div className='bg-white p-6 rounded-xl w-full max-w-md space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Mechanic</h3>
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.name}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, name: e.target.value })
              }
              placeholder='Name *'
            />
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.surname}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, surname: e.target.value })
              }
              placeholder='Surname *'
            />
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.phone}
              onChange={(e) =>
                setEditMechanic({
                  ...editMechanic,
                  phone: formatGermanPhone(e.target.value),
                })
              }
              placeholder='Phone *'
            />
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.specialization}
              onChange={(e) =>
                setEditMechanic({
                  ...editMechanic,
                  specialization: e.target.value,
                })
              }
              placeholder='Specialization *'
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
                onClick={saveMechanic}
                disabled={isEditDisabled}
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
