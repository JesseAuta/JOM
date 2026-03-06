'use client';

import { useState } from 'react';

interface Mechanic {
  id: number;
  name: string;
  surname: string;
  phone: string;
  profession: string;
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  mechanicIds: number[];
  icon?: string;
}

export default function SettingsLis() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      phone: '123456789',
      profession: 'Engineer',
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      phone: '987654321',
      profession: 'Mechanic',
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Oil Change',
      duration: 30,
      price: 50,
      mechanicIds: [1],
      icon: '🛢️',
    },
    {
      id: 2,
      name: 'Tire Replacement',
      duration: 60,
      price: 100,
      mechanicIds: [2],
      icon: '🛞',
    },
  ]);

  const [editMechanic, setEditMechanic] = useState<Mechanic | null>(null);
  const [editService, setEditService] = useState<Service | null>(null);

  const [newMechanic, setNewMechanic] = useState({
    name: '',
    surname: '',
    phone: '',
    profession: '',
  });
  const [newService, setNewService] = useState({
    name: '',
    duration: 0,
    price: 0,
    mechanicIds: [] as number[],
    icon: '',
  });

  // Dropdown visibility states
  const [mechanicDropdownOpen, setMechanicDropdownOpen] = useState(false);
  const [editMechanicDropdownOpen, setEditMechanicDropdownOpen] =
    useState(false);

  // ----- Handlers -----
  const saveMechanic = () => {
    if (!editMechanic) return;
    setMechanics((prev) =>
      prev.map((m) => (m.id === editMechanic.id ? editMechanic : m)),
    );
    setEditMechanic(null);
  };

  const deleteMechanic = (id: number) =>
    setMechanics((prev) => prev.filter((m) => m.id !== id));

  const addMechanic = () => {
    const id = Date.now();
    setMechanics([...mechanics, { id, ...newMechanic }]);
    setNewMechanic({ name: '', surname: '', phone: '', profession: '' });
  };

  const saveService = () => {
    if (!editService) return;
    setServices((prev) =>
      prev.map((s) => (s.id === editService.id ? editService : s)),
    );
    setEditService(null);
  };

  const deleteService = (id: number) =>
    setServices((prev) => prev.filter((s) => s.id !== id));

  const addService = () => {
    const id = Date.now();
    setServices([...services, { id, ...newService }]);
    setNewService({
      name: '',
      duration: 0,
      price: 0,
      mechanicIds: [],
      icon: '',
    });
  };

  return (
    <div className='p-6 space-y-10 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800'>Settings Dashboard</h1>

      {/* ====== MECHANICS LIST ====== */}
      <div className='bg-white rounded-xl shadow p-6 space-y-4'>
        <h2 className='text-2xl font-semibold mb-2'>Mechanics</h2>

        <div className='space-y-2'>
          {mechanics.map((m) => (
            <div
              key={m.id}
              className='flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm'
            >
              <div>
                <p className='font-bold'>
                  {m.name} {m.surname}
                </p>
                <p className='text-gray-600'>Phone: {m.phone}</p>
                <p className='text-gray-600'>Profession: {m.profession}</p>
              </div>
              <div className='flex gap-2'>
                <button
                  className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                  onClick={() => setEditMechanic(m)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                  onClick={() => deleteMechanic(m.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new mechanic */}
        <div className='mt-4 flex flex-wrap gap-2 items-center'>
          <input
            className='border px-2 py-1 rounded w-28'
            placeholder='Name'
            value={newMechanic.name}
            onChange={(e) =>
              setNewMechanic({ ...newMechanic, name: e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-28'
            placeholder='Surname'
            value={newMechanic.surname}
            onChange={(e) =>
              setNewMechanic({ ...newMechanic, surname: e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-32'
            placeholder='Phone'
            value={newMechanic.phone}
            onChange={(e) =>
              setNewMechanic({ ...newMechanic, phone: e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-32'
            placeholder='Profession'
            value={newMechanic.profession}
            onChange={(e) =>
              setNewMechanic({ ...newMechanic, profession: e.target.value })
            }
          />
          <button
            className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
            onClick={addMechanic}
          >
            Add
          </button>
        </div>
      </div>

      {/* ====== SERVICES LIST ====== */}
      <div className='bg-white rounded-xl shadow p-6 space-y-4'>
        <h2 className='text-2xl font-semibold mb-2'>Services</h2>

        <div className='space-y-2'>
          {services.map((s) => (
            <div
              key={s.id}
              className='flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm'
            >
              <div>
                <p className='text-xl'>
                  {s.icon || '🔧'} {s.name}
                </p>
                <p className='text-gray-600'>Duration: {s.duration} min</p>
                <p className='text-gray-600'>Price: ${s.price}</p>
                <p className='text-gray-600'>
                  Mechanics:{' '}
                  {s.mechanicIds
                    .map((id) => {
                      const m = mechanics.find((mech) => mech.id === id);
                      return m ? `${m.name} ${m.surname}` : '';
                    })
                    .join(', ') || '-'}
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                  onClick={() => setEditService(s)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                  onClick={() => deleteService(s.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new service */}
        <div className='mt-4 flex flex-wrap gap-2 items-center'>
          <input
            className='border px-2 py-1 rounded w-16'
            placeholder='Icon'
            value={newService.icon}
            onChange={(e) =>
              setNewService({ ...newService, icon: e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-32'
            placeholder='Name'
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-20'
            type='number'
            placeholder='Duration'
            value={newService.duration}
            onChange={(e) =>
              setNewService({ ...newService, duration: +e.target.value })
            }
          />
          <input
            className='border px-2 py-1 rounded w-20'
            type='number'
            placeholder='Price'
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: +e.target.value })
            }
          />

          {/* Dropdown for mechanics */}
          <div className='relative'>
            <button
              type='button'
              className='border px-2 py-1 rounded w-52 flex justify-between items-center'
              onClick={() => setMechanicDropdownOpen(!mechanicDropdownOpen)}
            >
              {newService.mechanicIds.length
                ? newService.mechanicIds
                    .map((id) => {
                      const m = mechanics.find((mech) => mech.id === id);
                      return m ? `${m.name} ${m.surname}` : '';
                    })
                    .join(', ')
                : 'Select Mechanics'}
              <span>▼</span>
            </button>

            {mechanicDropdownOpen && (
              <div className='absolute bg-white border mt-1 rounded shadow w-52 max-h-40 overflow-auto z-10'>
                {mechanics.map((m) => (
                  <div
                    key={m.id}
                    className='px-2 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center'
                    onClick={() => {
                      setNewService((prev) => {
                        const mechanicIds = prev.mechanicIds.includes(m.id)
                          ? prev.mechanicIds.filter((id) => id !== m.id)
                          : [...prev.mechanicIds, m.id];
                        return { ...prev, mechanicIds };
                      });
                    }}
                  >
                    {m.name} {m.surname}
                    {newService.mechanicIds.includes(m.id) && <span>✔</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
            onClick={addService}
          >
            Add
          </button>
        </div>
      </div>

      {/* ===== MODALS ===== */}
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
            <input
              className='border p-2 rounded w-full'
              value={editMechanic.profession}
              onChange={(e) =>
                setEditMechanic({ ...editMechanic, profession: e.target.value })
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

      {editService && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl w-96 space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Service</h3>
            <input
              className='border p-2 rounded w-full'
              value={editService.icon || ''}
              onChange={(e) =>
                setEditService({ ...editService, icon: e.target.value })
              }
              placeholder='Icon'
            />
            <input
              className='border p-2 rounded w-full'
              value={editService.name}
              onChange={(e) =>
                setEditService({ ...editService, name: e.target.value })
              }
              placeholder='Name'
            />
            <input
              className='border p-2 rounded w-full'
              type='number'
              value={editService.duration}
              onChange={(e) =>
                setEditService({ ...editService, duration: +e.target.value })
              }
              placeholder='Duration'
            />
            <input
              className='border p-2 rounded w-full'
              type='number'
              value={editService.price}
              onChange={(e) =>
                setEditService({ ...editService, price: +e.target.value })
              }
              placeholder='Price'
            />

            {/* Dropdown for editing mechanics */}
            <div className='relative'>
              <button
                type='button'
                className='border px-2 py-1 rounded w-full flex justify-between items-center'
                onClick={() =>
                  setEditMechanicDropdownOpen(!editMechanicDropdownOpen)
                }
              >
                {editService.mechanicIds.length
                  ? editService.mechanicIds
                      .map((id) => {
                        const m = mechanics.find((mech) => mech.id === id);
                        return m ? `${m.name} ${m.surname}` : '';
                      })
                      .join(', ')
                  : 'Select Mechanics'}
                <span>▼</span>
              </button>

              {editMechanicDropdownOpen && (
                <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-40 overflow-auto z-10'>
                  {mechanics.map((m) => (
                    <div
                      key={m.id}
                      className='px-2 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center'
                      onClick={() => {
                        setEditService((prev) => {
                          if (!prev) return prev;
                          const mechanicIds = prev.mechanicIds.includes(m.id)
                            ? prev.mechanicIds.filter((id) => id !== m.id)
                            : [...prev.mechanicIds, m.id];
                          return { ...prev, mechanicIds };
                        });
                      }}
                    >
                      {m.name} {m.surname}
                      {editService.mechanicIds.includes(m.id) && <span>✔</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='flex justify-end gap-3'>
              <button
                className='px-4 py-2 border rounded'
                onClick={() => setEditService(null)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-blue-600 text-white rounded'
                onClick={saveService}
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
