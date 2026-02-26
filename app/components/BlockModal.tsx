'use client';

import { useState } from 'react';

export default function BlockModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  dateText,
}: any) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl w-[420px] p-6 shadow-lg space-y-4'>
        <h2 className='text-xl font-semibold'>{title}</h2>

        <div className='text-sm text-gray-500'>{dateText}</div>

        <textarea
          placeholder='Reason...'
          className='w-full border rounded-lg p-3 h-28'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className='flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 rounded-lg'
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(reason);
              setReason('');
            }}
            className='px-4 py-2 bg-yellow-500 text-white rounded-lg'
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
}
