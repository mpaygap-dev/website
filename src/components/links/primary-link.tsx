import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { UnstyledLink, UnstyledLinkProps } from './unstyled-link';

export const PrimaryLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ className, children, ...rest }, ref) => {
  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={cls(
        'inline-flex items-center',
        'font-medium text-primary-600 hover:text-primary-500',
        'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
});
