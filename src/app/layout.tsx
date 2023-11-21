import type { Metadata } from 'next';

// import AuthStatus from '@/components/AuthStatus';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
// import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from './providers';

import { authOptions } from '@/utils/authOptions';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE!,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
};

export default async function RootLayout({ children }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Toaster />
        {/* <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense> */}
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
