import 'next-auth';
// import { ItodoItem } from "types";

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      password: string;
    };
  }
}
