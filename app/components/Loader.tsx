'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        return prev > 0 ? prev - 1 : prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalTime = 60;

  // First 60s blue progress
  const blueProgress = timeLeft >= 0 ? (totalTime - timeLeft) / totalTime : 1;

  // After 60s extra yellow progress
  const extraTime = Math.abs(Math.min(timeLeft, 0));
  const extraMax = 30;
  const yellowProgress = Math.min(extraTime / extraMax, 1);

  const angle = timeLeft >= 0 ? blueProgress * 360 : 360 + yellowProgress * 360;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  const blueDashOffset = circumference - blueProgress * circumference;
  const yellowDashOffset = circumference - yellowProgress * circumference;

  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center bg-white'>
      <div className='relative flex h-64 w-64 items-center justify-center'>
        <svg
          viewBox='0 0 256 256'
          className='absolute h-full w-full -rotate-90'
        >
          {/* Background circle */}
          <circle
            cx='128'
            cy='128'
            r={radius}
            stroke='#d1d5db'
            strokeWidth='12'
            fill='none'
          />

          {/* Blue progress circle for first 60s */}
          <circle
            cx='128'
            cy='128'
            r={radius}
            stroke='#2563eb'
            strokeWidth='12'
            fill='none'
            strokeDasharray={circumference}
            strokeDashoffset={blueDashOffset}
            strokeLinecap='round'
            style={{
              transition: 'stroke-dashoffset 1s linear',
            }}
          />

          {/* Yellow extra circle after 60s */}
          {timeLeft < 0 && (
            <circle
              cx='128'
              cy='128'
              r={radius - 18}
              stroke='#facc15'
              strokeWidth='8'
              fill='none'
              strokeDasharray={2 * Math.PI * (radius - 18)}
              strokeDashoffset={
                2 * Math.PI * (radius - 18) -
                yellowProgress * 2 * Math.PI * (radius - 18)
              }
              strokeLinecap='round'
              style={{
                transition: 'stroke-dashoffset 1s linear',
              }}
            />
          )}

          {/* Inner circle */}
          <circle
            cx='128'
            cy='128'
            r='82'
            stroke='#e5e7eb'
            strokeWidth='2'
            fill='none'
          />
        </svg>

        {/* Yellow needle */}
        <div
          className='absolute z-10 rounded bg-yellow-400'
          style={{
            width: '4px',
            height: '58px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            transformOrigin: 'bottom center',
            transition: 'transform 1s linear',
          }}
        />

        {/* Blue center dot */}
        <div className='absolute z-20 h-3 w-3 rounded-full bg-blue-900' />

        {/* Time text */}
        <div className='absolute z-30 top-35 text-3xl font-bold text-blue-900'>
          {timeLeft >= 0 ? `${timeLeft}s` : `+${Math.abs(timeLeft)}s`}
        </div>
      </div>

      <p className='mt-6 text-lg text-gray-600'>Waking up server...</p>
      <p className='text-sm text-gray-400'>Average wake-up time ~ 60s</p>

      {timeLeft < 0 && (
        <p className='mt-2 text-sm font-medium text-yellow-500'>
          Server is taking longer than usual...
        </p>
      )}
    </div>
  );
}
