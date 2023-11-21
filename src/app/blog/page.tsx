'use client';
/* eslint-disable no-unused-vars */
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ArticleList from '@/components/ArticleList';
import { Spin } from 'antd';

export default function BlogList() {
  const [article, setArticle] = useState<any[]>([]);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [countTotal, setCountTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const params = useSearchParams();
  const curPage = useMemo(() => {
    return params?.get('page');
  }, [params]);

  useEffect(() => {
    setPageCurrent(curPage ? ~~curPage : 1);
  }, [curPage]);

  const getArticleList = useCallback(() => {
    setLoading(true);
    fetch(`/api/blog?page=${pageCurrent}`, {
      method: 'GET',
      cache: 'no-store',
    }).then((res) => {
      res.json().then((result) => {
        result?.data?.length ? setArticle(result.data) : setArticle([]);
        result?.count ? setCountTotal(result.count): setCountTotal(0);
        setLoading(false);
      }).catch(err => {
        setArticle([])
        setCountTotal(0)
      }).finally(() => {
        setLoading(false);
      });
    });
  }, [pageCurrent]);

  useEffect(() => {
    getArticleList();
  }, [getArticleList]);

  return (
    <>
      {article?.length ? (
        <ArticleList
          totalPages={countTotal}
          currentPage={pageCurrent}
          articles={article}
        />
      ) : (
        <Spin spinning={loading}></Spin>
      )}
    </>
  );
}
