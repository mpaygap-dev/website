import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { UnstyledLink, UnstyledLinkProps } from './unstyled-link';

export const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps
>(({ children, className, ...rest }, ref) => {
  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={cls(
        'animated-underline custom-link inline-flex items-center font-semibold',
        'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'border-b border-dotted border-dark hover:border-black/0',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
});
