'use client';

import { useState } from 'react';
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
  type: BlockType;
  date: string;
  time?: string;
  reason: string;
}

const today = startOfToday();

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

  // ---------- CALENDAR ----------

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const startPadding = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1;

  // ---------- HELPERS ----------

  const dateKey = (date: Date) => format(date, 'yyyy-MM-dd');

  const isPast = (date: Date) => isBefore(date, today);

  const isDayBlocked = (date: string) =>
    blocks.some((b) => b.type === 'day' && b.date === date);

  const hasBlockedSlots = (date: string) =>
    blocks.some((b) => b.type === 'slot' && b.date === date);

  const isSlotBlocked = (date: string, time: string) =>
    blocks.some((b) => b.type === 'slot' && b.date === date && b.time === time);

  const removeBlock = (date: string, time?: string) => {
    setBlocks((prev) =>
      prev.filter(
        (b) =>
          !(b.date === date && (time ? b.time === time : b.type === 'day')),
      ),
    );
  };

  // ---------- SLOTS ----------

  const generateSlots = () => {
    const list: string[] = [];
    let start = new Date();
    start.setHours(9, 0, 0);

    for (let i = 0; i < 14; i++) {
      list.push(format(start, 'HH:mm'));
      start = addMinutes(start, 30);
    }

    return list;
  };

  const slots = generateSlots();

  // ---------- SAVE BLOCK ----------

  const saveBlock = () => {
    const type: BlockType = modal.time ? 'slot' : 'day';

    setBlocks((prev) => [
      ...prev,
      {
        type,
        date: modal.date,
        time: modal.time,
        reason,
      },
    ]);

    setModal({ open: false, date: '', time: '' });
    setReason('');
  };

  // ---------- COLORS ----------

  const getDayColor = (date: Date) => {
    const key = dateKey(date);

    if (isDayBlocked(key)) return 'bg-red-500 text-white';

    if (hasBlockedSlots(key)) return 'bg-pink-300 text-black';

    return 'bg-gray-100 hover:bg-blue-100';
  };

  // ---------- RENDER ----------

  return (
    <div className='p-6 space-y-6'>
      {/* HEADER */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className='px-3 py-1 border rounded'
        >
          ←
        </button>

        <h2 className='text-xl font-semibold'>
          {format(currentDate, 'MMMM yyyy')}
        </h2>

        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className='px-3 py-1 border rounded'
        >
          →
        </button>

        <button
          onClick={() => setCurrentDate(new Date())}
          className='ml-auto bg-blue-600 text-white px-3 py-1 rounded'
        >
          Today
        </button>
      </div>

      {/* WEEK DAYS */}
      <div className='grid grid-cols-7 text-center font-semibold'>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* CALENDAR GRID */}
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
              className={`p-3 rounded-lg ${
                disabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : getDayColor(date)
              }`}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      {/* SLOTS */}
      {selectedDate && (
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg'>
            Slots — {format(selectedDate, 'dd MMM yyyy')}
          </h3>

          <div className='grid grid-cols-6 gap-3'>
            {slots.map((time) => {
              const key = dateKey(selectedDate);
              const dayBlocked = isDayBlocked(key);
              const slotBlocked = isSlotBlocked(key, time);

              return (
                <button
                  key={time}
                  onClick={() => {
                    if (dayBlocked) {
                      const block = blocks.find(
                        (b) => b.type === 'day' && b.date === key,
                      );
                      setConfirm({
                        open: true,
                        date: key,
                        reason: block?.reason || '',
                        time: '',
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

                    setModal({ open: true, date: key, time });
                  }}
                  className={`p-2 rounded border ${
                    dayBlocked
                      ? 'bg-red-500 text-white'
                      : slotBlocked
                        ? 'bg-pink-400 text-white'
                        : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setModal({
                open: true,
                date: dateKey(selectedDate),
                time: '',
              })
            }
            className='bg-red-600 text-white px-4 py-2 rounded'
          >
            Block whole day
          </button>
        </div>
      )}

      {/* BLOCK MODAL */}
      {modal.open && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white rounded-xl p-6 w-96 space-y-4'>
            <h3 className='font-semibold text-lg'>
              Block {modal.time ? 'slot' : 'day'}
            </h3>

            <p className='text-sm text-gray-500'>
              {modal.date} {modal.time}
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Reason...'
              className='w-full border rounded p-2'
            />

            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setModal({ open: false, date: '', time: '' })}
                className='px-4 py-2 border rounded'
              >
                Cancel
              </button>

              <button
                onClick={saveBlock}
                className='px-4 py-2 bg-red-600 text-white rounded'
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM UNBLOCK MODAL */}
      {confirm.open && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white rounded-xl p-6 w-96 space-y-4'>
            <h3 className='text-lg font-semibold'>
              Unblock {confirm.time ? 'slot' : 'day'}?
            </h3>

            <p className='text-sm text-gray-500'>
              {confirm.date} {confirm.time}
            </p>

            {confirm.reason && (
              <div className='bg-gray-100 p-3 rounded text-sm'>
                Reason: {confirm.reason}
              </div>
            )}

            <div className='flex justify-end gap-3'>
              <button
                onClick={() =>
                  setConfirm({ open: false, date: '', time: '', reason: '' })
                }
                className='px-4 py-2 border rounded'
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  removeBlock(confirm.date, confirm.time);
                  setConfirm({ open: false, date: '', time: '', reason: '' });
                }}
                className='px-4 py-2 bg-green-600 text-white rounded'
              >
                Unblock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
