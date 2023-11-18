'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from 'types';
import LoadingDots from '../LoadingDot';

interface RegisterType extends User {
  repeatPassword: string;
}

export default function FormCom({ type }: { type: 'login' | 'register' }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 登录逻辑
  const login = ({ email, password }: User) => {
    setLoading(true);
    signIn('credentials', {
      redirect: false,
      email,
      password,
    })
      .then(async (res: any) => {
        if (res?.error) {
          toast.error(res.error);
        } else {
          router.refresh();
          router.push('/protected');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // 注册逻辑
  const register = ({ email, password, repeatPassword }: RegisterType) => {
    if (password !== repeatPassword) {
      toast.error('两次密码输入不一致！');
      return;
    }
    setLoading(true);
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        const result = await res.json();
        if (~~result?.code === 200) {
          toast.success('Account created! Redirecting to login...');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        toast.error(result?.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === 'login') {
          login({
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
          });
        } else {
          register({
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            repeatPassword: e.currentTarget.repeatPassword.value,
          });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          邮箱地址
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="请输入邮箱"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="请输入"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {type === 'register' ? (
        <div>
          <label
            htmlFor="repeatPassword"
            className="block text-xs text-gray-600 uppercase"
          >
            确认密码
          </label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="请再次输入密码"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ) : null}
      <button
        disabled={loading}
        className={`${
          loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === 'login' ? '登录' : '注册'}</p>
        )}
      </button>
      {type === 'login' ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{' '}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{' '}
          instead.
        </p>
      )}
    </form>
  );
}
