'use client';

import { useState } from 'react';

interface Mechanic {
  id: number;
  name: string;
  surname: string;
  phone: string;
  services?: string[]; // optional if you want to show assigned services
}

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([
    { id: 1, name: 'John', surname: 'Doe', phone: '123456789' },
    { id: 2, name: 'Jane', surname: 'Smith', phone: '987654321' },
  ]);

  const [editMechanic, setEditMechanic] = useState<Mechanic | null>(null);
  const [newMechanic, setNewMechanic] = useState({
    name: '',
    surname: '',
    phone: '',
  });

  const addMechanic = () => {
    const id = Date.now();
    setMechanics([...mechanics, { id, ...newMechanic }]);
    setNewMechanic({ name: '', surname: '', phone: '' });
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

    const confirmDelete = window.confirm(
      `Are you sure you want to delete mechanic ${mechanic.name} ${mechanic.surname}?`,
    );

    if (confirmDelete) {
      setMechanics((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold'>Mechanics</h1>

      {/* Mechanics List */}
      <div className='space-y-2'>
        {mechanics.map((m) => (
          <div
            key={m.id}
            className='flex items-center justify-between bg-white p-3 rounded shadow-sm'
          >
            <div>
              <p className='font-bold'>
                {m.name} {m.surname}
              </p>
              <p>Phone: {m.phone}</p>
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
      </div>

      {/* Add new mechanic */}
      <div className='flex gap-2 mt-4'>
        <input
          placeholder='Name'
          className='border px-2 py-1 rounded'
          value={newMechanic.name}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, name: e.target.value })
          }
        />
        <input
          placeholder='Surname'
          className='border px-2 py-1 rounded'
          value={newMechanic.surname}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, surname: e.target.value })
          }
        />
        <input
          placeholder='Phone'
          className='border px-2 py-1 rounded'
          value={newMechanic.phone}
          onChange={(e) =>
            setNewMechanic({ ...newMechanic, phone: e.target.value })
          }
        />
        <button
          className={`px-3 py-1 rounded text-white ${
            newMechanic.name && newMechanic.surname && newMechanic.phone
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={addMechanic}
          disabled={
            !newMechanic.name || !newMechanic.surname || !newMechanic.phone
          }
        >
          Add
        </button>
      </div>

      {/* Edit Modal */}
      {editMechanic && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl w-96 space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Mechanic</h3>
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.name}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, name: e.target.value })
              }
            />
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.surname}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, surname: e.target.value })
              }
            />
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.phone}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, phone: e.target.value })
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
                className='px-4 py-2 bg-blue-600 text-white rounded'
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
