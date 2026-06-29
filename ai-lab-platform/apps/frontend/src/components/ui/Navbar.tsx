'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

const navLinks = {
  PATIENT: [
    { href: '/patient/dashboard', label: 'Dashboard' },
    { href: '/patient/upload', label: 'Upload Lab' },
  ],
  DOCTOR: [
    { href: '/doctor/dashboard', label: 'Dashboard' },
    { href: '/doctor/reviews', label: 'Review Queue' },
  ],
  ADMIN: [
    { href: '/admin/dashboard', label: 'Admin' },
  ],
};

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-brand-700 font-bold text-lg">LabReview AI</Link>
        <div className="flex gap-4 text-sm">
          {user && navLinks[user.role]?.map(link => (
            <Link key={link.href} href={link.href} className="text-gray-600 hover:text-brand-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {user && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{user.name}</span>
          <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded text-xs font-medium">{user.role}</span>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors">Logout</button>
        </div>
      )}
    </nav>
  );
}
