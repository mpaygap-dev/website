import { Transition } from '@headlessui/react';
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
        <div>
          {props.children}
          <Transition
            show={!!props.helpText}
            enter='transition-all duration-150 overflow-hidden'
            enterFrom='h-0'
            enterTo='h-6'
            leave='transition-all duration-150 overflow-hidden'
            leaveFrom='h-6'
            leaveTo='h-0'
          >
            <HelpText aria-hidden={!props.helpText}>
              {props.helpText || '\u00A0'}
            </HelpText>
          </Transition>
        </div>
      </FieldContext.Provider>
    </div>
  );
};
