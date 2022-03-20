import * as React from 'react';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { NumberInput, NumberInputProps } from './number-input';

export interface NumberFieldProps
  extends NumberInputProps,
    ComposedFieldProps {}

export function NumberField(props: NumberFieldProps) {
  const { fieldProps, controlProps } = groupProps(props);

  return (
    <Field
      secondaryLabel={controlProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <NumberInput {...controlProps} />
    </Field>
  );
}
