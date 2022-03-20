import * as React from 'react';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { Textarea, TextareaProps } from './textarea';

export interface TextareaFieldProps extends TextareaProps, ComposedFieldProps {}

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(props, ref) {
  const { fieldProps, controlProps } = groupProps(props);

  return (
    <Field
      secondaryLabel={controlProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <Textarea {...controlProps} ref={ref} />
    </Field>
  );
});
