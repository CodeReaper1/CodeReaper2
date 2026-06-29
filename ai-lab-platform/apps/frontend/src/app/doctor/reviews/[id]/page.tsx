'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import api from '@/lib/api';
import { LabResult, Marker } from '@/types';

const REASON_CODES = [
  { value: 'INCORRECT_RANGE', label: 'Incorrect reference range used' },
  { value: 'MISSING_CONTEXT', label: 'Missing clinical context' },
  { value: 'NORMAL_VARIATION', label: 'Normal biological variation' },
  { value: 'ADDITIONAL_TEST_NEEDED', label: 'Additional testing recommended' },
];

const statusColors = { normal: 'text-green-700 bg-green-50', low: 'text-blue-700 bg-blue-50', high: 'text-red-700 bg-red-50' };

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, hydrate } = useAuthStore();
  const [lab, setLab] = useState<LabResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ decision: '', notes: '', reasonCode: '' });
  const [error, setError] = useState('');

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'DOCTOR') router.replace('/');
  }, [user]);

  useEffect(() => {
    if (!id) return;
    api.get(`/reviews/lab/${id}`)
      .then(r => setLab(r.data))
      .catch(() => router.push('/doctor/reviews'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (!form.decision) { setError('Please select a decision'); return; }
    if (form.decision !== 'AGREE' && !form.reasonCode) { setError('Please select a reason for disagreement'); return; }
    setSubmitting(true);
    setError('');
    try {
      await api.post('/reviews', {
        labResultId: id,
        decision: form.decision,
        notes: form.notes || undefined,
        reasonCode: form.reasonCode || undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="text-center py-20 text-gray-400">Loading...</div></div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted</h2>
          <p className="text-gray-500 mb-6">Thank you. Your review has been recorded and reputation points have been awarded.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push('/doctor/reviews')} className="btn-primary">View Queue</button>
            <button onClick={() => router.push('/doctor/dashboard')} className="btn-secondary">Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <button onClick={() => router.back()} className="text-sm text-brand-600 hover:underline mb-2">← Back to Queue</button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Lab Review #{id?.toString().slice(0, 8)}</h1>
            <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
              lab?.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
              lab?.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>{lab?.riskLevel} RISK</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Patient identifiers have been removed</p>
        </div>

        {/* AI Summary */}
        <div className="card border-l-4 border-brand-500">
          <h2 className="font-semibold text-gray-900 mb-2">AI Analysis</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{lab?.aiSummary}</p>
          {lab?.flags && lab.flags.length > 0 && (
            <ul className="mt-3 space-y-1">
              {lab.flags.map((f, i) => <li key={i} className="text-sm text-red-600">⚑ {f}</li>)}
            </ul>
          )}
        </div>

        {/* Markers */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Lab Values</h2>
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
              {lab?.markers?.map((m: Marker) => (
                <tr key={m.name}>
                  <td className="py-2.5 font-medium text-gray-900">{m.name}</td>
                  <td className="py-2.5">{m.value} {m.unit}</td>
                  <td className="py-2.5 text-gray-500">{m.range} {m.unit}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[m.status]}`}>
                      {m.status === 'normal' ? '✓' : m.status === 'low' ? '↓' : '↑'} {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Form */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Your Review</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Decision *</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'AGREE', label: '✓ Agree', desc: 'AI interpretation is correct', cls: 'border-green-300 bg-green-50 text-green-700' },
                  { value: 'PARTIALLY_AGREE', label: '~ Partial', desc: 'Partially agree, see notes', cls: 'border-yellow-300 bg-yellow-50 text-yellow-700' },
                  { value: 'DISAGREE', label: '✗ Disagree', desc: 'AI interpretation is incorrect', cls: 'border-red-300 bg-red-50 text-red-700' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setForm(f => ({ ...f, decision: opt.value }))}
                    className={`border-2 rounded-lg p-3 text-left transition-all ${form.decision === opt.value ? opt.cls : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {form.decision && form.decision !== 'AGREE' && (
              <div>
                <label className="label">Reason *</label>
                <select className="input" value={form.reasonCode}
                  onChange={e => setForm(f => ({ ...f, reasonCode: e.target.value }))}>
                  <option value="">Select reason...</option>
                  {REASON_CODES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="label">Clinical Notes (optional)</label>
              <textarea
                className="input min-h-[100px] resize-y"
                placeholder="Add clinical context, corrections, or recommendations..."
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button onClick={handleSubmit} disabled={submitting || !form.decision} className="btn-primary w-full">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
