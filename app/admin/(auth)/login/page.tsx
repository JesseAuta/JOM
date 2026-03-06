'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/admin/login', {
        email,
        password,
      });
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.response?.data || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-gray-100'>
      {/* LEFT BRAND BLOCK */}
      <div className='hidden md:flex w-1/2 bg-[#0E2A47] text-white items-center justify-center'>
        <div className='space-y-6 text-center'>
          <h1 className='text-4xl font-bold tracking-wide'>JOM AUTO</h1>
          <p className='text-gray-300 text-lg'>Admin Control Panel</p>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className='flex w-full md:w-1/2 items-center justify-center p-6'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Administrator login
          </h2>

          <form onSubmit={handleLogin} className='space-y-5'>
            {/* EMAIL */}
            <div>
              <label className='block text-sm text-gray-600 mb-1'>Email</label>
              <input
                type='email'
                required
                placeholder='admin@jom-auto.de'
                className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className='block text-sm text-gray-600 mb-1'>
                Password
              </label>
              <input
                type='password'
                required
                placeholder='••••••••'
                className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}
            {error && <div className='text-red-500 text-sm'>{error}</div>}

            {/* BUTTON */}
            <button
              disabled={loading}
              className='w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-3 rounded-lg'
            >
              {loading ? 'Entrance...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
