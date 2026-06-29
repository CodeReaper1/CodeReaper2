'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import LevelBadge from '@/components/ui/LevelBadge';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '@/lib/api';

const qc = new QueryClient();

function AdminDash() {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'ADMIN') router.replace('/');
  }, [user]);

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => (await api.get('/admin/stats')).data,
    enabled: !!user,
  });

  const statCards = [
    { label: 'Patients', value: stats?.patients ?? '—', color: 'text-blue-600' },
    { label: 'Doctors', value: stats?.doctors ?? '—', color: 'text-green-600' },
    { label: 'Lab Reports', value: stats?.labs ?? '—', color: 'text-purple-600' },
    { label: 'Reviews', value: stats?.reviews ?? '—', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div key={s.label} className="card text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {stats?.topDoctors?.length > 0 && (
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Top Doctors by Reputation</h2>
            <div className="space-y-2">
              {stats.topDoctors.map((d: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-5 text-sm font-medium">#{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{d.name}</p>
                      {d.specialty && <p className="text-xs text-gray-400">{d.specialty}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-brand-600">{d.reputationScore} pts</span>
                    <LevelBadge level={d.level} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <QueryClientProvider client={qc}><AdminDash /></QueryClientProvider>;
}
