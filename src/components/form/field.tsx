import * as React from 'react';

import { cls } from '@/lib/clsxm';

import { FieldContext, FieldStatus } from './field-context';
import { HelpText } from './help-text';
import { Label } from './label';

export interface FieldProps {
  children: React.ReactNode;
  status?: FieldStatus;
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  className?: string;
}

export const Field = (props: FieldProps) => {
  const [inputId, setInputId] = React.useState('');

  return (
    <div
      className={cls(
        'flex flex-col sm:flex-row gap-1 sm:gap-3',
        props.className
      )}
    >
      <FieldContext.Provider
        value={{
          inputId,
          setInputId,
          status: props.status,
        }}
      >
        {props.label && <Label className='sm:mt-2 flex-1'>{props.label}</Label>}
        <div className='flex-2 lg:flex-3'>
          {props.children}
          {props.helpText && <HelpText>{props.helpText}</HelpText>}
        </div>
      </FieldContext.Provider>
    </div>
  );
};
