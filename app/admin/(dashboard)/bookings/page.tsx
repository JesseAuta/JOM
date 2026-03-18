'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  format,
  startOfToday,
  isBefore,
  addMinutes,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';

type BlockType = 'day' | 'slot';

interface Block {
  id?: number;
  type: BlockType;
  date: string;
  time?: string;
  reason: string;
}

interface BookingBlockApiItem {
  id: number;
  block_date: string;
  block_time?: string | null;
  reason: string;
}

const today = startOfToday();

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const BLOCKS_URL = `${API}/admin/booking-blocks`;

export default function BookingPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const [modal, setModal] = useState({
    open: false,
    date: '',
    time: '',
  });

  const [confirm, setConfirm] = useState({
    open: false,
    date: '',
    time: '',
    reason: '',
  });

  const [reason, setReason] = useState('');

  const fetchBlocks = async () => {
    try {
      const res = await axios.get<BookingBlockApiItem[]>(BLOCKS_URL, {
        withCredentials: true,
      });

      const mappedBlocks: Block[] = res.data.map((item) => ({
        id: item.id,
        type: item.block_time ? 'slot' : 'day',
        date: item.block_date,
        time: item.block_time ? item.block_time.slice(0, 5) : '',
        reason: item.reason || '',
      }));

      setBlocks(mappedBlocks);
    } catch (err) {
      console.error('Error fetching booking blocks', err);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const startPadding = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1;

  const dateKey = (date: Date) => format(date, 'yyyy-MM-dd');

  const isPast = (date: Date) => isBefore(date, today);

  const isDayBlocked = (date: string) =>
    blocks.some((b) => b.type === 'day' && b.date === date);

  const isPastSlot = (date: Date, time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate < new Date();
  };

  const hasBlockedSlots = (date: string) =>
    blocks.some((b) => b.type === 'slot' && b.date === date);

  const isSlotBlocked = (date: string, time: string) =>
    blocks.some((b) => b.type === 'slot' && b.date === date && b.time === time);

  const removeBlock = async (date: string, time?: string) => {
    const block = blocks.find(
      (b) => b.date === date && (time ? b.time === time : b.type === 'day'),
    );

    if (!block?.id) return;

    try {
      await axios.delete(`${BLOCKS_URL}/${block.id}`, {
        withCredentials: true,
      });

      setBlocks((prev) => prev.filter((b) => b.id !== block.id));
    } catch (err) {
      console.error('Error deleting block', err);
    }
  };

  const generateSlots = () => {
    const list: string[] = [];
    let start = new Date();
    start.setHours(9, 0, 0, 0);

    for (let i = 0; i < 14; i++) {
      list.push(format(start, 'HH:mm'));
      start = addMinutes(start, 30);
    }

    return list;
  };

  const slots = generateSlots();

  const saveBlock = async () => {
    try {
      const res = await axios.post(
        BLOCKS_URL,
        {
          block_date: modal.date,
          block_time: modal.time || null,
          reason,
        },
        { withCredentials: true },
      );

      const created = res.data;

      setBlocks((prev) => [
        ...prev,
        {
          id: created.id,
          type: modal.time ? 'slot' : 'day',
          date: created.block_date,
          time: modal.time || '',
          reason: created.reason || '',
        },
      ]);

      setModal({ open: false, date: '', time: '' });
      setReason('');
    } catch (err) {
      console.error('Error saving block', err);
    }
  };

  const getDayColor = (date: Date) => {
    const key = dateKey(date);

    if (isDayBlocked(key)) return 'bg-red-500 text-white';
    if (hasBlockedSlots(key)) return 'bg-pink-300 text-black';
    if (selectedDate && dateKey(selectedDate) === key) return 'border';

    return 'bg-gray-100 hover:bg-blue-100';
  };

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='flex-1 space-y-6'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className='rounded border px-3 py-1'
            >
              ←
            </button>

            <h2 className='text-xl font-semibold'>
              {format(currentDate, 'MMMM yyyy')}
            </h2>

            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className='rounded border px-3 py-1'
            >
              →
            </button>

            <button
              onClick={() => setCurrentDate(new Date())}
              className='ml-auto rounded bg-blue-600 px-3 py-1 text-white'
            >
              Today
            </button>
          </div>

          <div className='grid grid-cols-7 text-center font-semibold'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-2'>
            {Array.from({ length: startPadding }).map((_, i) => (
              <div key={i} />
            ))}

            {days.map((date) => {
              const disabled = isPast(date);
              const key = dateKey(date);

              return (
                <button
                  key={key}
                  disabled={disabled}
                  onClick={() => !disabled && setSelectedDate(date)}
                  className={`rounded-lg p-3 ${
                    disabled
                      ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                      : getDayColor(date)
                  }`}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Slots — {format(selectedDate, 'dd MMM yyyy')}
              </h3>

              <div className='grid grid-cols-6 gap-3'>
                {slots.map((time) => {
                  const key = dateKey(selectedDate);
                  const dayBlocked = isDayBlocked(key);
                  const slotBlocked = isSlotBlocked(key, time);
                  const pastSlot = isPastSlot(selectedDate, time);

                  return (
                    <button
                      key={time}
                      disabled={pastSlot}
                      onClick={() => {
                        if (dayBlocked) {
                          const block = blocks.find(
                            (b) => b.type === 'day' && b.date === key,
                          );
                          setConfirm({
                            open: true,
                            date: key,
                            time: '',
                            reason: block?.reason || '',
                          });
                          return;
                        }

                        if (slotBlocked) {
                          const block = blocks.find(
                            (b) =>
                              b.type === 'slot' &&
                              b.date === key &&
                              b.time === time,
                          );
                          setConfirm({
                            open: true,
                            date: key,
                            time,
                            reason: block?.reason || '',
                          });
                          return;
                        }

                        if (pastSlot) return;

                        setModal({ open: true, date: key, time });
                      }}
                      className={`rounded border p-2 ${
                        dayBlocked
                          ? 'bg-red-500 text-white'
                          : slotBlocked
                            ? 'bg-pink-400 text-white'
                            : pastSlot
                              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                              : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  const key = dateKey(selectedDate);

                  if (isDayBlocked(key)) {
                    removeBlock(key);
                    return;
                  }

                  setModal({ open: true, date: key, time: '' });
                }}
                className={`rounded px-4 py-2 ${
                  isDayBlocked(dateKey(selectedDate))
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {isDayBlocked(dateKey(selectedDate))
                  ? 'Unblock whole day'
                  : 'Block whole day'}
              </button>
            </div>
          )}

          {modal.open && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/40'>
              <div className='w-96 space-y-4 rounded-xl bg-white p-6'>
                <h3 className='text-lg font-semibold'>
                  Block {modal.time ? 'slot' : 'day'}
                </h3>

                <p className='text-sm text-gray-500'>
                  {modal.date} {modal.time}
                </p>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder='Reason...'
                  className='w-full rounded border p-2'
                />

                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() =>
                      setModal({ open: false, date: '', time: '' })
                    }
                    className='rounded border px-4 py-2'
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      if (!reason.trim()) {
                        alert('Please enter a reason before blocking.');
                        return;
                      }
                      saveBlock();
                    }}
                    className='rounded bg-red-600 px-4 py-2 text-white'
                  >
                    Block
                  </button>
                </div>
              </div>
            </div>
          )}

          {confirm.open && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/40'>
              <div className='w-96 space-y-4 rounded-xl bg-white p-6'>
                <h3 className='text-lg font-semibold'>
                  Unblock {confirm.time ? 'slot' : 'day'}?
                </h3>

                <p className='text-sm text-gray-500'>
                  {confirm.date} {confirm.time}
                </p>

                {confirm.reason && (
                  <div className='rounded bg-gray-100 p-3 text-sm'>
                    Reason: {confirm.reason}
                  </div>
                )}

                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() =>
                      setConfirm({
                        open: false,
                        date: '',
                        time: '',
                        reason: '',
                      })
                    }
                    className='rounded border px-4 py-2'
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      removeBlock(confirm.date, confirm.time);
                      setConfirm({
                        open: false,
                        date: '',
                        time: '',
                        reason: '',
                      });
                    }}
                    className='rounded bg-green-600 px-4 py-2 text-white'
                  >
                    Unblock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar panel */}
        <div className='sticky top-6 hidden h-[calc(100vh-3rem)] w-80 rounded-xl bg-white p-6 shadow-lg lg:block'>
          <h3 className='mb-4 text-lg font-semibold'>Admin Added Blocks</h3>

          {blocks.length === 0 && (
            <p className='text-sm text-gray-500'>No blocks added yet.</p>
          )}

          {blocks.length > 0 && (
            <div className='max-h-full space-y-3 overflow-y-auto text-sm pr-2'>
              {blocks.map((block, index) => (
                <div
                  key={block.id ?? index}
                  className='rounded border border-gray-200 bg-gray-50 p-3 shadow-sm'
                >
                  <p className='font-medium'>{block.date}</p>
                  <p className='text-xs text-gray-600'>
                    {block.type === 'day' ? 'Whole Day' : `Slot: ${block.time}`}
                  </p>
                  {block.reason && (
                    <p className='mt-1 text-xs text-gray-700'>{block.reason}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='mt-8 rounded-xl border bg-white p-6 lg:hidden'>
        <h3 className='mb-4 text-lg font-semibold'>Admin Added Blocks</h3>

        {blocks.length === 0 && (
          <p className='text-sm text-gray-500'>No blocks added yet.</p>
        )}

        {blocks.length > 0 && (
          <div className='space-y-3 text-sm'>
            {blocks.map((block, index) => (
              <div
                key={block.id ?? index}
                className='rounded border bg-gray-50 p-3'
              >
                <p className='font-medium'>{block.date}</p>
                <p className='text-xs text-gray-600'>
                  {block.type === 'day' ? 'Whole Day' : `Slot: ${block.time}`}
                </p>
                {block.reason && (
                  <p className='mt-1 text-xs text-gray-700'>{block.reason}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
