import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wealth & Asset Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/chart.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
