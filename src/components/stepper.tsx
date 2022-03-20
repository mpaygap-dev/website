import { CheckIcon } from '@heroicons/react/solid';
import * as React from 'react';

import { cls } from '@/lib/clsxm';

export interface StepperProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  steps: Array<{
    label: string;
  }>;
  activeIndex: number;
  onChange: (index: number) => void;
  allowNavigateForward?: boolean;
}

export const Stepper = ({
  steps,
  activeIndex,
  onChange,
  allowNavigateForward,
  ...divProps
}: StepperProps) => {
  return (
    <div {...divProps} className={cls(divProps.className)}>
      <ol className='flex border border-gray-300 rounded-md'>
        {steps.map((step, stepIndex) => {
          const completed = stepIndex < activeIndex;

          return (
            <Step
              label={step.label}
              current={stepIndex === activeIndex}
              completed={completed}
              onClick={
                allowNavigateForward || completed
                  ? () => onChange(stepIndex)
                  : undefined
              }
              index={stepIndex}
              isLastItem={stepIndex === steps.length - 1}
              key={stepIndex}
            />
          );
        })}
      </ol>
    </div>
  );
};

const Step = (props: {
  label: string;
  current: boolean;
  completed: boolean;
  index: number;
  isLastItem: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      className={cls(
        'relative flex',
        props.current ? 'flex-1 justify-center md:justify-start' : 'md:flex-1'
      )}
    >
      {props.completed ? (
        <button
          onClick={props.onClick}
          type='button'
          className='group flex items-center w-full'
        >
          <span className='px-6 py-4 flex items-center text-sm font-medium'>
            <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800'>
              <CheckIcon className='w-6 h-6 text-white' aria-hidden='true' />
            </span>
            <span className='hidden md:inline ml-4 text-sm font-medium text-gray-900'>
              {props.label}
            </span>
          </span>
        </button>
      ) : props.current ? (
        <button
          onClick={props.onClick}
          type='button'
          className='px-6 py-4 flex items-center text-sm font-medium'
          aria-current='step'
        >
          <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full'>
            <span className='text-indigo-600'>
              {String(props.index + 1).padStart(2, '0')}
            </span>
          </span>
          <span className='ml-4 text-sm font-medium text-indigo-600'>
            {props.label}
          </span>
        </button>
      ) : (
        <button
          onClick={props.onClick}
          type='button'
          className='group flex items-center'
        >
          <span className='px-6 py-4 flex items-center text-sm font-medium'>
            <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400'>
              <span className='text-gray-500 group-hover:text-gray-900'>
                {String(props.index + 1).padStart(2, '0')}
              </span>
            </span>
            <span className='hidden md:inline ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900'>
              {props.label}
            </span>
          </span>
        </button>
      )}
      {!props.isLastItem ? (
        <>
          <div
            className='block absolute top-0 right-0 h-full w-5'
            aria-hidden='true'
          >
            <svg
              className='h-full w-full text-gray-300'
              viewBox='0 0 22 80'
              fill='none'
              preserveAspectRatio='none'
            >
              <path
                d='M0 -2L20 40L0 82'
                vectorEffect='non-scaling-stroke'
                stroke='currentcolor'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </>
      ) : null}
    </li>
  );
};
