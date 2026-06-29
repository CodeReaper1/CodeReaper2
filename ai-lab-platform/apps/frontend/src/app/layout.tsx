import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LabReview AI — Medical Lab Results Platform',
  description: 'AI-powered blood test analysis with doctor verification',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
