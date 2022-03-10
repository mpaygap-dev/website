import * as React from 'react';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-primary-400'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center pb-24'>
            <NextImage
              // className='mt-8'
              src='/images/mgp.jpg'
              width='362'
              height='175'
              alt='Icon'
            />
            <h1 className='sr-only'>Malaysian Paygap</h1>
            <p className='mt-2 text-lg text-white'>Goodbye Wage Taboo</p>
          </div>
        </section>
      </main>
      <footer className='absolute bottom-0 inset-x-0 text-center py-6 text-gray-700 bg-white'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://www.instagram.com/malaysianpaygap/'>
          malaysianpaygap
        </UnderlineLink>
      </footer>
    </Layout>
  );
}
