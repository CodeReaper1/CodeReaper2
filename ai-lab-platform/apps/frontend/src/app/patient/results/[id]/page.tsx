'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import Disclaimer from '@/components/ui/Disclaimer';
import RiskBadge from '@/components/ui/RiskBadge';
import LevelBadge from '@/components/ui/LevelBadge';
import api from '@/lib/api';
import { LabResult, Marker } from '@/types';

const statusColors = {
  normal: 'text-green-700 bg-green-50',
  low: 'text-blue-700 bg-blue-50',
  high: 'text-red-700 bg-red-50',
};

const statusLabels = { normal: '✓ Normal', low: '↓ Low', high: '↑ High' };

export default function ResultPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, hydrate } = useAuthStore();
  const [lab, setLab] = useState<LabResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => { hydrate(); }, []);

  useEffect(() => {
    if (!id) return;
    api.get(`/labs/${id}`)
      .then(r => setLab(r.data))
      .catch(() => router.push('/patient/dashboard'))
      .finally(() => setLoading(false));
  }, [id]);

  const requestReview = async () => {
    if (!lab) return;
    setRequesting(true);
    try {
      await api.patch(`/labs/${lab.id}/request-review`);
      setLab(prev => prev ? { ...prev, reviewRequested: true } : prev);
    } finally {
      setRequesting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="text-center py-20 text-gray-400">Loading...</div></div>;
  if (!lab) return null;

  const abnormalMarkers = lab.markers?.filter(m => m.status !== 'normal') || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button onClick={() => router.back()} className="text-sm text-brand-600 hover:underline mb-2">← Back</button>
            <h1 className="text-2xl font-bold text-gray-900">{lab.fileName}</h1>
            <p className="text-gray-500 text-sm">{new Date(lab.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <RiskBadge level={lab.riskLevel} />
        </div>

        <Disclaimer />

        {/* Risk indicator */}
        <div className={`card border-l-4 ${lab.riskLevel === 'HIGH' ? 'border-red-500' : lab.riskLevel === 'MEDIUM' ? 'border-yellow-500' : 'border-green-500'}`}>
          <h2 className="font-semibold text-gray-900 mb-1">AI Analysis Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{lab.aiSummary}</p>
        </div>

        {/* Flags */}
        {lab.flags?.length > 0 && (
          <div className="card border border-red-100 bg-red-50">
            <h2 className="font-semibold text-red-800 mb-2">⚑ Flags</h2>
            <ul className="space-y-1">
              {lab.flags.map((flag, i) => (
                <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">•</span>{flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Markers Table */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Lab Values ({lab.markers?.length || 0} markers)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2 font-medium">Marker</th>
                  <th className="pb-2 font-medium">Result</th>
                  <th className="pb-2 font-medium">Reference Range</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lab.markers?.map((marker: Marker) => (
                  <tr key={marker.name} className={marker.status !== 'normal' ? 'bg-red-50/30' : ''}>
                    <td className="py-2.5 font-medium text-gray-900">{marker.name}</td>
                    <td className="py-2.5 text-gray-700">{marker.value} {marker.unit}</td>
                    <td className="py-2.5 text-gray-500">{marker.range} {marker.unit}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[marker.status]}`}>
                        {statusLabels[marker.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Reviews */}
        {lab.reviews && lab.reviews.length > 0 && (
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-4">Doctor Reviews ({lab.reviews.length})</h2>
            <div className="space-y-3">
              {lab.reviews.map(review => (
                <div key={review.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      review.decision === 'AGREE' ? 'bg-green-100 text-green-700' :
                      review.decision === 'PARTIALLY_AGREE' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{review.decision.replace('_', ' ')}</span>
                    {review.doctor && <LevelBadge level={review.doctor.level} />}
                    {review.doctor?.specialty && <span className="text-xs text-gray-500">{review.doctor.specialty}</span>}
                  </div>
                  {review.notes && <p className="text-sm text-gray-700">{review.notes}</p>}
                  {review.reasonCode && (
                    <p className="text-xs text-gray-400 mt-1">Reason: {review.reasonCode.replace(/_/g, ' ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Doctor Review */}
        {!lab.reviewRequested ? (
          <div className="card bg-blue-50 border border-blue-100">
            <h2 className="font-semibold text-blue-900 mb-1">Want a doctor to review this?</h2>
            <p className="text-sm text-blue-700 mb-3">A verified doctor will review the AI analysis and provide their professional perspective.</p>
            <button onClick={requestReview} disabled={requesting} className="btn-primary text-sm">
              {requesting ? 'Requesting...' : 'Request Doctor Review'}
            </button>
          </div>
        ) : (
          <div className="card bg-green-50 border border-green-100">
            <p className="text-sm text-green-700">✓ Doctor review has been requested. You&apos;ll see it here when a doctor responds.</p>
          </div>
        )}
      </div>
    </div>
  );
}
