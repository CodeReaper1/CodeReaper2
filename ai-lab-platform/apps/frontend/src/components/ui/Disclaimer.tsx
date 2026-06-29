export default function Disclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
      <span className="mt-0.5 text-amber-500 shrink-0">⚠</span>
      <span>
        <strong>Medical Disclaimer:</strong> This platform provides informational analysis only and is{' '}
        <strong>not a medical diagnosis</strong>. Always consult a qualified healthcare professional
        for medical advice, diagnosis, or treatment.
      </span>
    </div>
  );
}
