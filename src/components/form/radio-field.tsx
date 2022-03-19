import * as React from 'react';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { Radio, RadioGroupProps } from './radio';

export interface RadioFieldProps
  extends ComposedFieldProps,
    Omit<RadioGroupProps, 'children'> {
  options: Array<{
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }>;
}

export const RadioField = (providedProps: RadioFieldProps) => {
  const {
    fieldProps,
    controlProps: { options, ...radioProps },
  } = groupProps(providedProps);

  return (
    <Field {...fieldProps}>
      <Radio.Group {...radioProps}>
        {options.map((option, i) => (
          <Radio value={option.value} label={option.label} key={i} />
        ))}
      </Radio.Group>
    </Field>
  );
};
