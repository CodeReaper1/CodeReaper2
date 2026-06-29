'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import Disclaimer from '@/components/ui/Disclaimer';
import RiskBadge from '@/components/ui/RiskBadge';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import api from '@/lib/api';
import { LabResult } from '@/types';

const qc = new QueryClient();

function Dashboard() {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'PATIENT') router.replace('/');
  }, [user]);

  const { data: labs = [], isLoading } = useQuery<LabResult[]>({
    queryKey: ['labs'],
    queryFn: async () => (await api.get('/labs')).data,
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Lab Results</h1>
            <p className="text-gray-500 text-sm mt-0.5">Upload and track your blood test reports</p>
          </div>
          <Link href="/patient/upload" className="btn-primary">+ Upload Lab Report</Link>
        </div>

        <Disclaimer />

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : labs.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-lg">No lab results yet</p>
            <p className="text-gray-400 text-sm mt-1">Upload your first blood test PDF to get started</p>
            <Link href="/patient/upload" className="btn-primary inline-block mt-4">Upload Now</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {labs.map(lab => (
              <Link key={lab.id} href={`/patient/results/${lab.id}`}>
                <div className="card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{lab.fileName}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {new Date(lab.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {' · '}{lab.markers?.length || 0} markers analyzed
                      </p>
                      {lab.flags?.length > 0 && (
                        <p className="text-sm text-red-600 mt-1">⚑ {lab.flags.length} flag{lab.flags.length > 1 ? 's' : ''}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {lab.reviewRequested && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Doctor Review</span>
                      )}
                      <RiskBadge level={lab.riskLevel} />
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

export default function PatientDashboard() {
  return <QueryClientProvider client={qc}><Dashboard /></QueryClientProvider>;
}
