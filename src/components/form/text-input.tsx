import * as React from 'react';

import { cls } from '@/lib/clsxm';
import { callAll } from '@/lib/fn-lib';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
  variant?: 'border' | 'underline';
  compact?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      className,
      onChangeValue,
      onChange,
      id,
      variant = 'border',
      compact,
      ...inputProps
    },
    forwardedRef
  ) {
    const { inputId, status } = useFieldControlContext(id);

    return (
      <input
        type='text'
        id={inputId}
        className={cls(
          {
            border:
              'rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
            underline:
              'border-0 border-b-2 focus:ring-0 focus:border-primary-500',
          }[variant],
          'block min-w-0 w-full sm:text-sm',
          status ? borderByStatus[status] : 'border-gray-300',
          compact && 'py-0.5',
          (inputProps.readOnly || inputProps.disabled) &&
            'bg-gray-100 text-gray-400',
          className
        )}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        {...inputProps}
        ref={forwardedRef}
      />
    );
  }
);
