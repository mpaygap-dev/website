import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { IsClientProvider } from '@/hooks/use-is-client';

/**
 *
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IsClientProvider>
      <Component {...pageProps} />
    </IsClientProvider>
  );
}

export default MyApp;
