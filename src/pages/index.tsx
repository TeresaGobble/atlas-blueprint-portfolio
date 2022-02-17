import {getNextStaticProps} from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { GetStaticPropsContext } from 'next';

export default function Page() {
  const {useQuery} = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <main className="content" />
    </>
  )

}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}