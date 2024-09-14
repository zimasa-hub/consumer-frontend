// lib/RootLayout.tsx
import { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import StoreProvider from '@/lib/StoreProvider';
import { User } from '@/lib/interfaces';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: '100',
});

export const metadata: Metadata = {
  title: 'Zimasa',
  description: 'Consumer App',
};

export default function RootLayout({

  children,
}: {
  
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider >
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
