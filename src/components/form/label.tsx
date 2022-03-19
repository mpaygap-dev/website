import React from 'react';

import { cls } from '@/lib/clsxm';

import { FieldContext } from './field-context';

export const Label = (props: React.ComponentPropsWithoutRef<'label'>) => {
  const { inputId } = React.useContext(FieldContext);

  return (
    <label
      htmlFor={inputId}
      {...props}
      className={cls('block text-gray-700', props.className)}
    />
  );
};
