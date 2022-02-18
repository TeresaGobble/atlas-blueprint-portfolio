import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';
import { client } from 'client';

export default function Page() {
  const { useQuery, useCategory } = client;
  const generalSettings = useQuery().generalSettings;
  const categories = useQuery()?.categories();

  if (useQuery().$state.isLoading) {
    return null;
  }
  debugger;
  return (
    <>
      <Head>
        <title> All Categories - {generalSettings?.title}</title>
      </Head>

      <main className="content">
        <div className="container">
          <ul>
            {
              categories?.nodes?.map(({ id, name }) => {
                return (<li key={id}>
                  {
                    <Link href={`category/${name}`}>
                      <a>{name}</a>
                    </Link>
                  }
                </li>)
              })
            }
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}