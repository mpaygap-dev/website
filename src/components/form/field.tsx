import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { FieldContext, FieldStatus } from './field-context';
import { HelpText } from './help-text';
import { Label } from './label';

export interface FieldProps {
  children: React.ReactNode;
  status?: FieldStatus;
  label?: React.ReactNode;
  secondaryLabel?: string;
  helpText?: React.ReactNode;
  className?: string;
}

export const Field = (props: FieldProps) => {
  const [inputId, setInputId] = React.useState('');

  return (
    <div className={cls('flex flex-col gap-1', props.className)}>
      <FieldContext.Provider
        value={{
          inputId,
          setInputId,
          status: props.status,
        }}
      >
        {(props.label || props.secondaryLabel) && (
          <div className='flex justify-between gap-5'>
            {props.label ? <Label>{props.label}</Label> : <span />}
            {props.secondaryLabel && (
              <span className='text-sm text-gray-500'>
                {props.secondaryLabel}
              </span>
            )}
          </div>
        )}
        {props.children}
        {props.helpText && <HelpText>{props.helpText}</HelpText>}
      </FieldContext.Provider>
    </div>
  );
};
