import { authOptions } from "@/utils/authOptions";
import { getServerSession } from 'next-auth/next';

export default async function AuthStatus() {
  const session = await getServerSession(authOptions);
  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && <p className="text-sm">Signed in as {session.user?.email}</p>}
    </div>
  );
}
