import * as React from 'react';

import { Layout } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { NextImage } from '@/components/next-image';
import { Seo } from '@/components/seo';

export default function HomePage() {
  return (
    <Layout hideHeader>
      <Seo />

      <main>
        <section className='bg-primary-400'>
          <div className='layout h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center pb-24'>
            <NextImage
              // className='mt-8'
              src='/images/mgp.jpg'
              width='362'
              height='175'
              alt='Icon'
              priority
            />
            <h1 className='sr-only'>Malaysian Paygap</h1>
            <p className='my-2 text-lg text-white'>Goodbye Wage Taboo</p>
            <div className='py-3'>
              <ButtonLink href='/submit-salary' variant='light'>
                SUBMIT SALARY
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
