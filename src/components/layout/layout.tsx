import * as React from 'react';

import { Footer } from './footer';
import { Header } from './header';

export type LayoutProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
};

export function Layout({ children, hideHeader }: LayoutProps) {
  return (
    <>
      {hideHeader ? null : <Header />}
      {children}
      <Footer />
    </>
  );
}
