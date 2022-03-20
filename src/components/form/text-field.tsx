import * as React from 'react';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { TextInput, TextInputProps } from './text-input';

export interface TextFieldProps extends TextInputProps, ComposedFieldProps {}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const { fieldProps, controlProps } = groupProps(props);

    return (
      <Field
        secondaryLabel={controlProps.required ? undefined : 'Optional'}
        {...fieldProps}
      >
        <TextInput {...controlProps} ref={ref} />
      </Field>
    );
  }
);
