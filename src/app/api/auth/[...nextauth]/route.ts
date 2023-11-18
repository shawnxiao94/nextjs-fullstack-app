import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.uid as string;
      session.user.email = token.email as string;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      // credentials 用于配置登录页面的表单
      credentials: {
        email: { label: '邮箱', type: 'email', placeholder: '请输入邮箱' },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          // throw new Error('Missing username or password');
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          // throw new Error('Invalid username or password');
          return null;
        }
        // 返回的对象将保存在JWT 的用户属性中
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

