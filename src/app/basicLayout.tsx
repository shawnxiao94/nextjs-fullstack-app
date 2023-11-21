'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Props) {
  // console.log('当前路径:', useParams(), useSearchParams(), usePathname());
  if (!usePathname()?.includes('blog')) {
    return <div className="min-h-screen">{children}</div>;
  }
  return (
    <div className="layout flex-col">
      <div className="p-3 bg-primary-50 border-b border-primary-100 top-0 sticky z-10">
        <div className="mx-auto max-w-5xl relative z-20 flex justify-between items-center">
          <div className="flex items-center max-w-full">
            <Link href="/">
              <span className="flex items-center no-underline">
                <Image
                  src={process.env.NEXT_PUBLIC_AVATAR as string}
                  alt=""
                  width="20"
                  height="20"
                  className="h-10 w-10 md:h-8 md:w-8 lg:h-14 lg:w-14 rounded-full"
                />
              </span>
            </Link>
            <Link href="/">
              <span className="ml-3 block no-underline text-xl lg:text-2xl font-extrabold leading-none lg:leading-tight">
                {process.env.NEXT_PUBLIC_AUTHOR}
              </span>
            </Link>
          </div>
          <div className="tracking-wide text-xs spaced-x-6">
            <Link href="/blog">
              <span className=" font-semibold no-underline hover:text-primary-500">
                全部文章
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="blog-content">{children}</div>
      <footer className="p-3 bg-primary-50 border-t border-primary-100 text-center py-5">
        Github • © 2022 • Next.js Juejin Blog
      </footer>
    </div>
  );
}
