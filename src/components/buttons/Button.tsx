import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cls } from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
}

export type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
  render?: (props: {
    className: string;
    children: React.ReactNode;
    ref: React.ForwardedRef<any>;
  }) => React.ReactElement<unknown> | null;
} & React.ComponentPropsWithRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      render,
      ...rest
    },
    ref
  ) {
    const disabled = isLoading || buttonDisabled;

    const classes = cls(
      'inline-flex items-center rounded px-4 py-2 font-semibold',
      'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
      'shadow-sm',
      'transition-colors duration-75',
      //#region  //*=========== Variants ===========
      [
        variant === 'primary' && [
          'bg-primary-500 text-white',
          'border border-primary-600',
          'hover:bg-primary-600 hover:text-white',
          'active:bg-primary-500',
          'disabled:bg-primary-400 disabled:hover:bg-primary-400',
        ],
        variant === 'outline' && [
          'text-primary-500',
          'border border-primary-500',
          'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
          isDarkBg &&
            'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
        ],
        variant === 'ghost' && [
          'text-primary-500',
          'shadow-none',
          'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
          isDarkBg &&
            'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
        ],
        variant === 'light' && [
          'bg-white text-primary-600',
          'border border-gray-300',
          'hover:bg-gray-100',
          'active:bg-white/80 disabled:bg-gray-200',
        ],
        variant === 'dark' && [
          'bg-gray-900 text-white',
          'border border-gray-600',
          'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
        ],
      ],
      //#endregion  //*======== Variants ===========
      'disabled:cursor-not-allowed',
      isLoading &&
        'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
      className
    );

    const content = (
      <>
        {isLoading && (
          <div
            className={cls(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </>
    );

    if (render) {
      return render({
        ...rest,
        className: classes,
        children: content,
        ref,
      });
    }

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {content}
      </button>
    );
  }
);
