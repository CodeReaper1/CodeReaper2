'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '@/lib/api';

const qc = new QueryClient();

function ReviewsQueue() {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'DOCTOR') router.replace('/');
  }, [user]);

  const { data: queue = [], isLoading } = useQuery({
    queryKey: ['review-queue'],
    queryFn: async () => (await api.get('/reviews/queue')).data,
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
          <p className="text-sm text-gray-500 mt-0.5">Anonymized lab results awaiting your review</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
          <strong>Reviewer Guidelines:</strong> All patient identifiers have been removed. Review the AI interpretation
          and provide your professional assessment. Each review earns reputation points.
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading queue...</div>
        ) : queue.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-lg">Queue is empty</p>
            <p className="text-gray-400 text-sm mt-1">No lab results are currently awaiting review</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((lab: any) => (
              <Link key={lab.id} href={`/doctor/reviews/${lab.id}`}>
                <div className="card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">Lab Report #{lab.id.slice(0, 8)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          lab.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                          lab.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>{lab.riskLevel} RISK</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted {new Date(lab.createdAt).toLocaleDateString()} · {lab.markers?.length || 0} markers · {lab.flags?.length || 0} flags
                      </p>
                      {lab.flags?.length > 0 && (
                        <p className="text-sm text-red-600 mt-1 truncate">{lab.flags[0]}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="btn-secondary text-sm">Review →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReviewsQueuePage() {
  return <QueryClientProvider client={qc}><ReviewsQueue /></QueryClientProvider>;
}
