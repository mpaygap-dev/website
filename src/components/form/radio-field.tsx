import * as React from 'react';

import { callAll } from '@/lib/fn-lib';

import { Field } from './field';
import { ComposedFieldProps, groupProps } from './field.helper';
import { Radio, RadioGroupProps } from './radio';
import { TextInput } from './text-input';

export interface RadioFieldProps
  extends ComposedFieldProps,
    Omit<RadioGroupProps, 'children'> {
  options: Array<{
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }>;
  allowOthers?: boolean;
}

export const RadioField = (providedProps: RadioFieldProps) => {
  const {
    fieldProps,
    controlProps: { options, allowOthers, ...radioProps },
  } = groupProps(providedProps);

  const [othersValue, setOthersValue] = React.useState('');

  return (
    <Field
      secondaryLabel={radioProps.required ? undefined : 'Optional'}
      {...fieldProps}
    >
      <Radio.Group {...radioProps}>
        {options.map((option, i) => (
          <Radio
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            key={i}
          />
        ))}
        {allowOthers && (
          <div className='flex gap-3'>
            <Radio value={othersValue} label='Others' />
            {othersValue === radioProps.value && (
              <TextInput
                value={othersValue}
                onChangeValue={callAll(
                  setOthersValue,
                  radioProps.value === othersValue && radioProps.onChangeValue
                )}
                variant='underline'
                compact
                autoFocus
                required={radioProps.required}
              />
            )}
          </div>
        )}
      </Radio.Group>
    </Field>
  );
};
