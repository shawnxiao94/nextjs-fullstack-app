'use client';

// 客户端组件中的获取身份信息

import { SessionProvider } from 'next-auth/react';
import BasicLayout from './basicLayout';

type Props = {
  children?: React.ReactNode;
  session?: any;
};

export const NextAuthProvider = ({
  children,
  session,
}: Props): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <BasicLayout>{children}</BasicLayout>
    </SessionProvider>
  );
};
