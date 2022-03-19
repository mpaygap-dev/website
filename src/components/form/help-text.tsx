import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { FieldContext } from './field-context';

export const HelpText = (props: React.ComponentPropsWithoutRef<'span'>) => {
  const { status } = React.useContext(FieldContext);

  return (
    <span
      {...props}
      className={cls(
        'block text-xs p-1',
        status
          ? {
              error: 'text-red-500',
              warning: 'text-yellow-800',
              success: 'text-green-800',
            }[status]
          : 'text-gray-600',
        props.className
      )}
    />
  );
};
