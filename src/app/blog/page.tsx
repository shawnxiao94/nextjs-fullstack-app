'use client';
/* eslint-disable no-unused-vars */
import { getArticles } from '@/lib/db';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BlogList() {
  const [article, setArticle] = useState<any[]>([]);

  const searchParams: any = useSearchParams();
  const page = searchParams.get('page') || 1;
  // 通过 API 请求数据
  const uid = process.env.NEXT_PUBLIC_UID!;
  useEffect(() => {
    getArticles(uid, (+page - 1) * 10).then((res) => {
      console.log('res:', res);
    });
  }, [uid, page]);

  return <>page</>;
}
