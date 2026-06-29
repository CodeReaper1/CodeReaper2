'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const { user, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === 'DOCTOR') router.replace('/doctor/dashboard');
      else if (user.role === 'ADMIN') router.replace('/admin/dashboard');
      else router.replace('/patient/dashboard');
    } else {
      router.replace('/login');
    }
  }, [user]);

  return null;
}
