'use client';

import { useEffect, useState } from 'react';
import ServicesPage from './servicesPage';
import Loader from '../components/Loader';

export default function Services() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkServer = async () => {
      try {
        const res = await fetch('/api/health', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Health check failed');
        }

        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Health check error:', error);

        setTimeout(() => {
          if (isMounted) checkServer();
        }, 2000);
      }
    };

    checkServer();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <ServicesPage />;
}
