import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Manrope } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'RentalCar - Car Rental Company',
  description:
    'Reliable and budget-friendly rentals for any journey. Easy online booking.',
  openGraph: {
    title: 'RentalCar - Car Rental Company',
    description:
      'Reliable and budget-friendly rentals for any journey. Easy online booking.',
    url: 'https://rental-car-xi-blue.vercel.app/',
    siteName: 'RentalCar',
    locale: 'en-US',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
