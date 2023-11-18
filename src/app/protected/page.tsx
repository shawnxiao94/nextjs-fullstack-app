'use client';
import SignOut from '@/components/SignOut';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import TodoList from './components/TodoList';

export default function Home() {
  // 用法与服务端多了一步
  const { data: session } = useSession();
  const [shown, setShown] = useState<boolean>(false);
  const clickHandler = (): void => {
    setShown(!shown);
  };

  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <TodoList></TodoList>
        <div>
          <h1 className="leading-loose">Hi {session?.user?.email}!</h1>
          <p>Protected client page</p>
          <button
            className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center px-4 py-2"
            onClick={clickHandler}
          >
            Toggle
          </button>
          {shown ? <pre>{JSON.stringify(session, null, 2)}</pre> : null}
        </div>
        <SignOut></SignOut>
      </div>
    </div>
  );
}
