'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/ui/Navbar';
import Disclaimer from '@/components/ui/Disclaimer';
import api from '@/lib/api';

export default function UploadPage() {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (user && user.role !== 'PATIENT') router.replace('/');
  }, [user]);

  const handleFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    setFile(f);
    setError('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post('/labs/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push(`/patient/results/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Lab Report</h1>
          <p className="text-gray-500 text-sm mt-0.5">Upload your blood test PDF for AI analysis</p>
        </div>

        <Disclaimer />

        <div className="card space-y-5">
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              dragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400'
            }`}
          >
            <input ref={inputRef} type="file" accept=".pdf" className="hidden"
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
            <div className="text-4xl mb-3">📄</div>
            {file ? (
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-gray-700">Drop your PDF here or click to browse</p>
                <p className="text-sm text-gray-400 mt-1">Blood test reports, CBC panels, metabolic panels</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
            <strong>What happens next:</strong>
            <ul className="mt-1 space-y-1 list-disc list-inside text-blue-600">
              <li>AI extracts lab values from your PDF</li>
              <li>Values are compared against reference ranges</li>
              <li>You receive a clear summary with flagged values</li>
              <li>You can optionally request a doctor review</li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="btn-primary w-full text-base py-3"
          >
            {loading ? '⟳ Analyzing...' : 'Analyze Lab Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
