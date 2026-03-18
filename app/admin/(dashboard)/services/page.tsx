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
  hidden?: boolean;
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
    hidden: false,
  });
  const [editService, setEditService] = useState<Service | null>(null);

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);



const fetchMechanics = async () => {
  try {
    const res = await axios.get(`${API}/api/mechanics`);
    setMechanics(res.data);
  } catch (err) {
    console.error('Error fetching mechanics', err);
  }
};

  const fetchServices = async () => {
    try {
      const res = await axios.get<Service[]>(`${API}/api/services`);
      setServices(
        res.data.map((s) => ({
          ...s,
          mechanicIds: s.mechanicIds || [],
          hidden: s.hidden || false,
        })),
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

  const addServiceHandler = async () => {
    if (
      !newService.name ||
      newService.price <= 0 ||
      newService.mechanicIds.length === 0 ||
      !newService.description
    )
      return;
    try {
      const res = await axios.post<Service>(
        `${API}/api/services`,
        newService,
      );
      setServices([
        ...services,
        {
          ...res.data,
          mechanicIds: res.data.mechanicIds || [],
          hidden: res.data.hidden || false,
        },
      ]);
      setNewService({
        id: 0,
        name: '',
        price: 0,
        mechanicIds: [],
        icon: '',
        description: '',
        hidden: false,
      });
    } catch (err) {
      console.error('Error adding service', err);
    }
  };

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
      await axios.put(
        `${API}/api/services/${editService.id}`,
        editService,
      );
      setServices((prev) =>
        prev.map((s) => (s.id === editService.id ? { ...editService } : s)),
      );
      setEditService(null);
    } catch (err) {
      console.error('Error updating service', err);
    }
  };

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const deleteServiceHandler = async (id: number) => {
  if (!confirm('Are you sure?')) return;

  try {
    await axios.delete(`${API}/api/services/${id}`);
    setServices((prev) => prev.filter((s) => s.id !== id));
  } catch (err) {
    console.error('Error deleting service', err);
  }
};

  const toggleVisibility = async (s: Service) => {
    const updated = { ...s, hidden: !s.hidden };
    try {
      await axios.put(`${API}/api/services/${s.id}`, updated);
      setServices((prev) =>
        prev.map((srv) => (srv.id === s.id ? updated : srv)),
      );
    } catch (err) {
      console.error('Error updating visibility', err);
    }
  };

  const canAdd =
    newService.name &&
    newService.price > 0 &&
    newService.mechanicIds.length > 0 &&
    newService.description;

  return (
    <div className='p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen space-y-6'>
      <h1 className='text-2xl sm:text-3xl font-bold'>Services</h1>

      {/* Add Service */}
      <div className='flex flex-col md:flex-row md:items-end gap-2 md:gap-3 flex-wrap'>
        <input
          placeholder='Icon'
          className='border px-2 py-1 rounded w-16 sm:w-20'
          value={newService.icon}
          onChange={(e) =>
            setNewService({ ...newService, icon: e.target.value })
          }
        />
        <input
          placeholder='Name'
          className='border px-2 py-1 rounded flex-1 min-w-[120px] sm:min-w-[160px]'
          value={newService.name}
          onChange={(e) =>
            setNewService({ ...newService, name: e.target.value })
          }
        />
        <input
          placeholder='Price'
          type='number'
          min={10}
          className='border px-2 py-1 rounded w-24 sm:w-32'
          value={newService.price}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: Math.max(0, +e.target.value),
            })
          }
        />

        {/* Mechanic Dropdown */}
        <div className='relative flex-1 min-w-[140px] md:min-w-[180px]'>
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
            <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-48 overflow-auto z-10'>
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
        <textarea
          placeholder='Description'
          ref={descriptionRef}
          className='border p-2 rounded w-full md:w-auto flex-1 resize-none overflow-hidden mt-2 md:mt-0'
          value={newService.description}
          onChange={(e) => {
            setNewService({ ...newService, description: e.target.value });
            resizeTextarea(descriptionRef.current);
          }}
          rows={2}
        />

        <button
          className={`px-3 py-1 rounded text-white ${
            canAdd
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!canAdd}
          onClick={addServiceHandler}
        >
          Add
        </button>
      </div>

      {/* Services List */}
      <div className='space-y-2 mt-4'>
        {services.slice(0, visibleCount).map((s) => (
          <div
            key={s.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded shadow-sm gap-2 ${
              s.hidden ? 'opacity-50' : ''
            }`}
          >
            <div className='flex-1'>
              <p className='text-lg sm:text-xl'>
                {s.icon || '🔧'} {s.name}
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>
                {s.description}
              </p>
              <p className='text-sm sm:text-base'>Price: ${s.price}</p>
              <p className='text-sm sm:text-base'>
                Mechanic:{' '}
                {s.mechanicIds
                  .map((id) => {
                    const m = mechanics.find((mech) => mech.id === id);
                    return m ? `${m.first_name} ${m.last_name}` : 'Unknown';
                  })
                  .join(', ') || '-'}
              </p>
            </div>

            <div className='flex items-center gap-2 mt-2 sm:mt-0'>
              {/* Visibility Checkbox */}
              <label className='flex items-center gap-1 text-sm sm:text-base'>
                <input
                  type='checkbox'
                  checked={!s.hidden}
                  onChange={() => toggleVisibility(s)}
                />
                Visible
              </label>

              <button
                className='bg-blue-900 text-white px-3 py-1 rounded'
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
          <div className='bg-white p-4 sm:p-6 rounded-xl w-full max-w-md space-y-4'>
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
              className='border px-2 py-1 rounded w-full sm:w-48'
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
              className='border px-2 py-1 rounded w-full sm:w-32'
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
              className='border p-2 rounded w-full resize-none overflow-hidden mt-2'
              value={editService.description || ''}
              onChange={(e) => {
                setEditService((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev,
                );
                resizeTextarea(editTextareaRef.current);
              }}
              rows={2}
            />

            {/* Mechanic dropdown */}
            <div className='relative w-full sm:w-48'>
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
                <div className='absolute bg-white border mt-1 rounded shadow w-full max-h-48 overflow-auto z-10'>
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
                className={`px-4 py-2 rounded text-white ${
                  editService.name &&
                  editService.price > 0 &&
                  editService.mechanicIds.length > 0 &&
                  editService.description
                    ? 'bg-blue-800 hover:bg-blue-900'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
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
