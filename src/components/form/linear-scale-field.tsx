import * as React from 'react';

import { range } from '@/lib/array';
import { cls } from '@/lib/clsxm';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { RadioCard, RadioCardGroupProps } from './radio-card';

export interface LinearScaleFieldProps
  extends ComposedFieldProps,
    Omit<RadioCardGroupProps<number>, 'children'> {
  from?: number;
  to?: number;
  fromLabel?: React.ReactNode;
  toLabel?: React.ReactNode;
  required?: boolean;
}

export const LinearScaleField = (providedProps: LinearScaleFieldProps) => {
  const {
    fieldProps,
    controlProps: { from = 1, to = 5, fromLabel, toLabel, ...radioProps },
  } = groupProps(providedProps);

  const options = React.useMemo(() => range(from, to), [from, to]);

  return (
    <Field
      secondaryLabel={radioProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <RadioCard.Group
        {...radioProps}
        className={cls(
          'justify-between items-center py-2',
          radioProps.className
        )}
      >
        {fromLabel ? (
          <span className='text-sm text-gray-700'>{fromLabel}</span>
        ) : null}
        {options.map((val) => (
          <RadioCard value={val} label={String(val)} key={val} />
        ))}
        {toLabel ? (
          <span className='text-sm text-gray-700'>{toLabel}</span>
        ) : null}
      </RadioCard.Group>
    </Field>
  );
};
