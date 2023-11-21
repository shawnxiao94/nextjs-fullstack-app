import { getArticleDetail, getArticles } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

// 查询blog
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uid = process.env.NEXT_PUBLIC_UID!;
  const page = searchParams.get('page') as string;
  const res = await getArticles(uid, (+page - 1) * 10);
  return Response.json(res);
}

// 添加todo
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') as string;
  const res = await getArticleDetail(id);
  console.log('id:', id);

  return NextResponse.json(res);
}
