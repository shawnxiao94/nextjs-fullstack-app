'use client';
import '@/styles/article.css';
import { Spin } from 'antd';
import { NextSeo } from 'next-seo';
import { useParams } from 'next/navigation';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // 代码高亮
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const Blog: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const param = useParams();
  const cId = useMemo(() => {
    return param?.id;
  }, [param]);

  const getArticleDetail = useCallback(() => {
    setLoading(true);
    fetch(`/api/blog?id=${cId}`, { method: 'POST', cache: 'no-store' }).then(
      (res) => {
        res.json().then((result) => {
          console.log('result', result);
          result?.data && setData(result.data);
          setLoading(false);
        });
      }
    );
  }, [cId]);

  useEffect(() => {
    getArticleDetail();
  }, []);

  return (
    <>
      {data ? (
        <div className="article">
          <NextSeo
            title={data?.article_info?.title}
            description={data?.article_info?.brief_content}
            openGraph={{
              images: [{ url: data?.article_info?.cover_image }],
            }}
          />
          <div className="title">
            <h1>{data?.article_info?.title}</h1>
            <div className="data">
              <time>
                {new Date(+data?.article_info?.ctime * 1000).toLocaleDateString(
                  'zh-CN',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </time>
            </div>
          </div>
          <div className="test">
            <article className="content py-8 prose  prose-h1:mt-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        // eslint-disable-next-line react/no-children-prop
                        children={String(children).replace(/\n$/, '')}
                        style={tomorrow as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {data?.article_info.mark_content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      ) : (
        <Spin spinning={loading}></Spin>
      )}
    </>
  );
};

export default Blog;
