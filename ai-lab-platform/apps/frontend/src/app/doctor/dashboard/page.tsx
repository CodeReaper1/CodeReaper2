'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import LevelBadge from '@/components/ui/LevelBadge';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '@/lib/api';
import { Reputation } from '@/types';

const qc = new QueryClient();

function Dashboard() {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'DOCTOR') router.replace('/');
  }, [user]);

  const { data: rep } = useQuery<Reputation>({
    queryKey: ['reputation'],
    queryFn: async () => (await api.get('/reputation/me')).data,
    enabled: !!user,
  });

  const { data: queue = [] } = useQuery({
    queryKey: ['review-queue'],
    queryFn: async () => (await api.get('/reviews/queue')).data,
    enabled: !!user,
  });

  const LEVEL_THRESHOLDS: Record<string, number> = { BRONZE: 0, SILVER: 100, GOLD: 300, PLATINUM: 700, EXPERT: 1500 };
  const nextThreshold = rep?.nextLevel ? LEVEL_THRESHOLDS[rep.nextLevel.level] : null;
  const currentThreshold = LEVEL_THRESHOLDS[rep?.level || 'BRONZE'];
  const progress = nextThreshold ? Math.min(100, ((rep?.reputationScore || 0) - currentThreshold) / (nextThreshold - currentThreshold) * 100) : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Reputation Card */}
          <div className="card col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">{rep?.name || user?.name}</h2>
                {rep?.specialty && <p className="text-sm text-gray-500">{rep.specialty}</p>}
              </div>
              {rep?.level && <LevelBadge level={rep.level} />}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-600">{rep?.reputationScore || 0}</p>
                <p className="text-xs text-gray-500">Reputation Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">{rep?.reviewCount || 0}</p>
                <p className="text-xs text-gray-500">Reviews Done</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">{queue.length}</p>
                <p className="text-xs text-gray-500">Pending Reviews</p>
              </div>
            </div>
            {rep?.nextLevel && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{rep.level}</span>
                  <span>{rep.nextLevel.level} ({rep.nextLevel.pointsNeeded} pts needed)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card flex flex-col gap-3">
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
            <Link href="/doctor/reviews" className="btn-primary text-center text-sm">
              Review Queue ({queue.length})
            </Link>
          </div>
        </div>

        {/* Recent Queue Preview */}
        {queue.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Pending Reviews</h2>
              <Link href="/doctor/reviews" className="text-sm text-brand-600 hover:underline">See all</Link>
            </div>
            <div className="space-y-2">
              {queue.slice(0, 3).map((lab: any) => (
                <Link key={lab.id} href={`/doctor/reviews/${lab.id}`}>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lab.fileName}</p>
                      <p className="text-xs text-gray-500">{new Date(lab.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${lab.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' : lab.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {lab.riskLevel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  return <QueryClientProvider client={qc}><Dashboard /></QueryClientProvider>;
}
