'use client';

import { useState } from 'react';

interface Service {
  id: number;
  name: string;
  price: number;
  mechanicIds: number[];
  icon?: string;
}

interface Mechanic {
  id: number;
  name: string;
  surname: string;
}

export default function ServicesPage() {
  const [mechanics] = useState<Mechanic[]>([
    { id: 1, name: 'John', surname: 'Doe' },
    { id: 2, name: 'Jane', surname: 'Smith' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Oil Change', price: 50, mechanicIds: [1], icon: '🛢️' },
    {
      id: 2,
      name: 'Tire Replacement',
      price: 100,
      mechanicIds: [2],
      icon: '🛞',
    },
    // Add more if needed
  ]);

  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: '',
    price: 0,
    mechanicIds: [],
    icon: '',
  });

  const [editService, setEditService] = useState<Service | null>(null);

  // ✅ Separate dropdown states
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);

  const addService = () => {
    if (
      !newService.name ||
      newService.price <= 0 ||
      newService.mechanicIds.length === 0
    )
      return;
    const id = Date.now();
    setServices([...services, { ...newService, id }]);
    setNewService({ id: 0, name: '', price: 0, mechanicIds: [], icon: '' });
  };

  const deleteService = (id: number) => {
    const service = services.find((s) => s.id === id);
    if (
      service &&
      confirm(`Are you sure you want to delete "${service.name}"?`)
    ) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const saveService = () => {
    if (!editService) return;
    if (
      !editService.name ||
      editService.price <= 0 ||
      editService.mechanicIds.length === 0
    )
      return;
    setServices((prev) =>
      prev.map((s) => (s.id === editService.id ? editService : s)),
    );
    setEditService(null);
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold'>Services</h1>

      {/* ===== Add / New Service Inputs ===== */}
      <div className='flex gap-2 mt-4 items-end'>
        <div className='flex flex-col'>
          <label className='text-gray-500 text-sm'>Icon</label>
          <input
            placeholder='Icon'
            className='border px-2 py-1 rounded w-16'
            value={newService.icon}
            onChange={(e) =>
              setNewService({ ...newService, icon: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-500 text-sm'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            placeholder='Name'
            className='border px-2 py-1 rounded w-32'
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-500 text-sm'>
            Price <span className='text-red-500'>*</span>
          </label>
          <input
            placeholder='Price'
            type='number'
            className='border px-2 py-1 rounded w-20'
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: +e.target.value })
            }
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-gray-500 text-sm'>
            Mechanic <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <button
              type='button'
              className='border px-2 py-1 rounded w-52 flex justify-between'
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
            >
              {newService.mechanicIds.length
                ? newService.mechanicIds
                    .map((id) => {
                      const m = mechanics.find((mech) => mech.id === id);
                      return m ? `${m.name} ${m.surname}` : '';
                    })
                    .join(', ')
                : 'Select Mechanic'}
              <span>▼</span>
            </button>
            {addDropdownOpen && (
              <div className='absolute bg-white border mt-1 rounded shadow w-52 max-h-40 overflow-auto z-10'>
                {mechanics.map((m) => (
                  <div
                    key={m.id}
                    className='px-2 py-1 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setNewService({ ...newService, mechanicIds: [m.id] });
                      setAddDropdownOpen(false); // closes after selection
                    }}
                  >
                    {m.name} {m.surname}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className={`px-3 py-1 rounded text-white ${
            !newService.name ||
            newService.price <= 0 ||
            newService.mechanicIds.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={addService}
          disabled={
            !newService.name ||
            newService.price <= 0 ||
            newService.mechanicIds.length === 0
          }
        >
          Add
        </button>
      </div>

      {/* ===== Services List (first 5) ===== */}
      <div className='space-y-2 mt-4'>
        {services.slice(0, 5).map((s) => (
          <div
            key={s.id}
            className='flex items-center justify-between bg-white p-3 rounded shadow-sm'
          >
            <div>
              <p className='text-xl'>
                {s.icon || '🔧'} {s.name}
              </p>
              <p>Price: ${s.price}</p>
              <p>
                Mechanic:{' '}
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
                className='bg-blue-600 text-white px-3 py-1 rounded'
                onClick={() => setEditService(s)}
              >
                Edit
              </button>
              <button
                className='bg-red-600 text-white px-3 py-1 rounded'
                onClick={() => deleteService(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Edit Service Modal ===== */}
      {editService && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl w-96 space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Service</h3>

            <div className='flex flex-col'>
              <label className='text-gray-500 text-sm'>Icon</label>
              <input
                placeholder='Icon'
                className='border p-2 rounded w-full'
                value={editService.icon || ''}
                onChange={(e) =>
                  setEditService({ ...editService, icon: e.target.value })
                }
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-500 text-sm'>Name *</label>
              <input
                placeholder='Name'
                className='border p-2 rounded w-full'
                value={editService.name}
                onChange={(e) =>
                  setEditService({ ...editService, name: e.target.value })
                }
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-500 text-sm'>Price *</label>
              <input
                placeholder='Price'
                type='number'
                className='border p-2 rounded w-full'
                value={editService.price}
                onChange={(e) =>
                  setEditService({ ...editService, price: +e.target.value })
                }
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-500 text-sm'>Mechanic *</label>
              <div className='relative'>
                <button
                  type='button'
                  className='border px-2 py-1 rounded w-full flex justify-between'
                  onClick={() => setEditDropdownOpen(!editDropdownOpen)}
                >
                  {editService.mechanicIds.length
                    ? editService.mechanicIds
                        .map((id) => {
                          const m = mechanics.find((mech) => mech.id === id);
                          return m ? `${m.name} ${m.surname}` : '';
                        })
                        .join(', ')
                    : 'Select Mechanic'}
                  <span>▼</span>
                </button>

                {editDropdownOpen && (
                  <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-40 overflow-auto z-10'>
                    {mechanics.map((m) => (
                      <div
                        key={m.id}
                        className='px-2 py-1 hover:bg-gray-100 cursor-pointer'
                        onClick={() => {
                          setEditService({
                            ...editService,
                            mechanicIds: [m.id],
                          });
                          setEditDropdownOpen(false); // closes after selection
                        }}
                      >
                        {m.name} {m.surname}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-end gap-3'>
              <button
                className='px-4 py-2 border rounded'
                onClick={() => setEditService(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  !editService.name ||
                  editService.price <= 0 ||
                  editService.mechanicIds.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={saveService}
                disabled={
                  !editService.name ||
                  editService.price <= 0 ||
                  editService.mechanicIds.length === 0
                }
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
