import React from 'react';
import { client } from 'client';
import {
  Footer,
  Header,
  EntryHeader,
  LoadMore,
  Main,
  Projects,
  SEO,
} from 'components';
import { getNextStaticProps } from '@faustjs/next';
import { pageTitle } from 'utils';
import useNodePagination, {
  defaultProjectPrepassItems,
} from 'hooks/useNodePagination';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = useNodePagination(
    (query, queryArgs) => query.projects(queryArgs),
    defaultProjectPrepassItems
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Portfolio')} />

      <Header />

      <Main>
        <EntryHeader title="Portfolio" />
        <div className="container">
          <Projects projects={data.nodes} id="portfolio-list" />
          <LoadMore
            className="text-center"
            hasNextPage={data?.hasNextPage}
            endCursor={data?.endCursor}
            isLoading={isLoading}
            fetchMore={fetchMore}
          />
        </div>
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
