'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  price: number;
  mechanicIds: number[];
  icon?: string;
  description: string;
}

interface Mechanic {
  id: number;
  first_name: string;
  last_name: string;
}

export default function ServicesPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: '',
    price: 0,
    mechanicIds: [],
    icon: '',
    description: '',
  });
  const [editService, setEditService] = useState<Service | null>(null);

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch mechanics
  const fetchMechanics = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/mechanics');
      setMechanics(res.data);
    } catch (err) {
      console.error('Error fetching mechanics', err);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get<Service[]>(
        'http://localhost:8000/api/services',
      );
      setServices(
        res.data.map((s) => ({ ...s, mechanicIds: s.mechanicIds || [] })),
      );
    } catch (err) {
      console.error('Error fetching services', err);
    }
  };

  useEffect(() => {
    fetchMechanics();
    fetchServices();
  }, []);

  const resizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  // Add service
  const addServiceHandler = async () => {
    if (
      !newService.name ||
      newService.price <= 0 ||
      newService.mechanicIds.length === 0 ||
      !newService.description
    )
      return;

    try {
      const payload = { ...newService };
      const res = await axios.post<Service>(
        'http://localhost:8000/api/services',
        payload,
      );
      setServices([
        ...services,
        { ...res.data, mechanicIds: res.data.mechanicIds || [] },
      ]);
      setNewService({
        id: 0,
        name: '',
        price: 0,
        mechanicIds: [],
        icon: '',
        description: '',
      });
    } catch (err) {
      console.error('Error adding service', err);
    }
  };

  // Edit service
  const saveServiceHandler = async () => {
    if (
      !editService ||
      !editService.name ||
      editService.price <= 0 ||
      editService.mechanicIds.length === 0 ||
      !editService.description
    )
      return;

    try {
      const payload = { ...editService };
      await axios.put(
        `http://localhost:8000/api/services/${editService.id}`,
        payload,
      );
      setServices((prev) =>
        prev.map((s) => (s.id === editService.id ? { ...editService } : s)),
      );
      setEditService(null);
    } catch (err) {
      console.error('Error updating service', err);
    }
  };

  const deleteServiceHandler = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting service', err);
    }
  };

  const canAdd =
    newService.name &&
    newService.price > 0 &&
    newService.mechanicIds.length > 0 &&
    newService.description;

  return (
    <div className='p-6 bg-gray-50 min-h-screen space-y-6'>
      <h1 className='text-3xl font-bold'>Services</h1>

      {/* Add Service */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-end'>
          <input
            placeholder='Icon'
            className='border px-2 py-1 rounded w-16'
            value={newService.icon}
            onChange={(e) =>
              setNewService({ ...newService, icon: e.target.value })
            }
          />
          <input
            placeholder='Name'
            className='border px-2 py-1 rounded w-32' // smaller name input
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            placeholder='Price'
            type='number'
            min={10}
            className='border px-2 py-1 rounded w-24'
            value={newService.price}
            onChange={(e) =>
              setNewService({
                ...newService,
                price: Math.max(0, +e.target.value),
              })
            }
          />
          <div className='relative w-48'>
            {' '}
            {/* wider dropdown */}
            <button
              type='button'
              className='border px-2 py-1 rounded w-full flex justify-between'
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
            >
              {newService.mechanicIds.length
                ? newService.mechanicIds
                    .map((id) => {
                      const m = mechanics.find((mech) => mech.id === id);
                      return m ? `${m.first_name} ${m.last_name}` : 'Unknown';
                    })
                    .join(', ')
                : 'Select Mechanic'}
              <span>▼</span>
            </button>
            {addDropdownOpen && (
              <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-60 overflow-auto z-10'>
                {mechanics.map((m) => (
                  <div
                    key={m.id}
                    className='px-2 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setNewService({ ...newService, mechanicIds: [m.id] });
                      setAddDropdownOpen(false);
                    }}
                  >
                    {m.first_name} {m.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className={`px-3 py-1 rounded text-white ${canAdd ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!canAdd}
            onClick={addServiceHandler}
          >
            Add
          </button>
        </div>

        <textarea
          placeholder='Description'
          ref={descriptionRef}
          className='border p-2 rounded w-96 resize-none overflow-hidden'
          value={newService.description}
          onChange={(e) => {
            setNewService({ ...newService, description: e.target.value });
            resizeTextarea(descriptionRef.current);
          }}
          rows={2}
        />
      </div>

      {/* Services List */}
      <div className='space-y-2 mt-4'>
        {services.slice(0, visibleCount).map((s) => (
          <div
            key={s.id}
            className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-3 rounded shadow-sm gap-2'
          >
            <div>
              <p className='text-xl'>
                {s.icon || '🔧'} {s.name}
              </p>
              <p className='text-gray-600'>{s.description}</p>
              <p>Price: ${s.price}</p>
              <p>
                Mechanic:{' '}
                {s.mechanicIds
                  .map((id) => {
                    const m = mechanics.find((mech) => mech.id === id);
                    return m ? `${m.first_name} ${m.last_name}` : 'Unknown';
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
                onClick={() => deleteServiceHandler(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {visibleCount < services.length && (
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
      {editService && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
          <div className='bg-white p-6 rounded-xl w-full max-w-md space-y-4'>
            <h3 className='text-lg font-semibold'>Edit Service</h3>
            <input
              placeholder='Icon'
              className='border p-2 rounded w-full'
              value={editService.icon || ''}
              onChange={(e) =>
                setEditService((prev) =>
                  prev ? { ...prev, icon: e.target.value } : prev,
                )
              }
            />
            <input
              placeholder='Name'
              className='border px-2 py-1 rounded w-32' // smaller width
              value={editService.name}
              onChange={(e) =>
                setEditService((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev,
                )
              }
            />
            <input
              placeholder='Price'
              type='number'
              min={10}
              className='border px-2 py-1 rounded w-24'
              value={editService.price}
              onChange={(e) =>
                setEditService((prev) =>
                  prev
                    ? { ...prev, price: Math.max(0, +e.target.value) }
                    : prev,
                )
              }
            />
            <textarea
              placeholder='Description'
              ref={editTextareaRef}
              className='border p-2 rounded w-96 resize-none overflow-hidden' // bigger description
              value={editService.description || ''}
              onChange={(e) => {
                setEditService((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev,
                );
                resizeTextarea(editTextareaRef.current);
              }}
              rows={2}
            />

            <div className='relative w-48'>
              <button
                className='border px-2 py-1 rounded w-full flex justify-between'
                onClick={() => setEditDropdownOpen(!editDropdownOpen)}
              >
                {editService.mechanicIds.length
                  ? editService.mechanicIds
                      .map((id) => {
                        const m = mechanics.find((mech) => mech.id === id);
                        return m ? `${m.first_name} ${m.last_name}` : 'Unknown';
                      })
                      .join(', ')
                  : 'Select Mechanic'}
                <span>▼</span>
              </button>
              {editDropdownOpen && (
                <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-60 overflow-auto z-10'>
                  {mechanics.map((m) => (
                    <div
                      key={m.id}
                      className='px-2 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() =>
                        setEditService((prev) =>
                          prev ? { ...prev, mechanicIds: [m.id] } : prev,
                        )
                      }
                    >
                      {m.first_name} {m.last_name}
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
                className={`px-4 py-2 rounded text-white ${editService.name && editService.price > 0 && editService.mechanicIds.length > 0 && editService.description ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={
                  !editService.name ||
                  editService.price <= 0 ||
                  editService.mechanicIds.length === 0 ||
                  !editService.description
                }
                onClick={saveServiceHandler}
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
