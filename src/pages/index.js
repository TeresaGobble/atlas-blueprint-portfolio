import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { Posts, Header, LoadMore, Footer, Main } from 'components';
import appConfig from 'app.config';
import usePagination from 'hooks/usePagination';

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const { data, fetchMore, isLoading } = usePagination(
    (query, args) => {
      const { nodes, pageInfo } = query.posts(args);
      return {
        nodes: Array.from(nodes),
        pageInfo,
      };
    },
    { nodes: posts?.nodes, pageInfo: posts?.pageInfo }
  );

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Header title="Home Page" />

      <Main className="container">
        <Posts posts={data?.nodes} readMoreText={'Read More'} id="posts-list" />
        <LoadMore
          pageInfo={data.pageInfo}
          isLoading={isLoading}
          fetchMore={fetchMore}
        />
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}