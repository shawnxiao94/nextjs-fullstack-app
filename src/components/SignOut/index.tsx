'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
      onClick={() => signOut()}
    >
      退出
    </button>
  );
}
