import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon as CheckInCircleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon as ExclamationIcon,
  InformationCircleIcon as InfoIcon,
  XCircleIcon as CrossInCircleIcon,
} from '@heroicons/react/outline';
import * as Announce from '@radix-ui/react-announce';
import * as React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { cls } from '@/lib/clsxm';

export interface AlertProps
  extends Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'onClick' | 'aria-atomic' | 'role'
    >,
    Pick<Announce.AnnounceProps, 'type' | 'role' | 'aria-atomic'> {
  variant: 'error' | 'info' | 'warning' | 'success';
  description?: React.ReactNode;
  feature?: 'button';
  leftIcon?: React.ComponentType<any>;
  accentBorder?: boolean;
  action?: React.ReactNode;
  onClick?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    {
      variant,
      description,
      feature,
      type,
      accentBorder,
      action = feature === 'button' ? (
        <ChevronRightIcon className='w-5 h-5' />
      ) : undefined,
      leftIcon: Icon = iconByVariant[variant],
      onClick,
      children,
      ...props
    },
    ref
  ) {
    const isButton = feature === 'button';

    const content = (
      <>
        {Icon && (
          <div className='flex-shrink-0'>
            <Icon
              className={cls('h-4 w-4 block', iconColorByVariant[variant])}
            />
          </div>
        )}
        <div className={cls('flex-1 text-sm', textByVariant[variant])}>
          {description && <p className='leading-5'>{description}</p>}
          {children}
        </div>
        {action && (
          <div
            className={cls(
              'flex-shrink-0 inline-flex items-center',
              iconColorByVariant[variant]
            )}
          >
            {action}
          </div>
        )}
      </>
    );

    const containerClass = cls(
      'px-4 py-3 rounded',
      bgByVariant[variant],
      accentBorder && ['border-l-4', borderColorByVariant[variant]]
    );

    return (
      <Announce.Root
        {...props}
        type={type}
        className={cls(!isButton && containerClass, props.className)}
        ref={ref}
      >
        {isButton ? (
          <button
            onClick={onClick}
            className={cls(
              'flex w-full items-center text-left space-x-2 focus:outline-none focus-visible:ring-1',
              containerClass,
              buttonByVariant[variant]
            )}
            type='button'
          >
            {content}
          </button>
        ) : (
          <div className='flex items-center space-x-2'>{content}</div>
        )}
      </Announce.Root>
    );
  }
);

type AlertVariant = AlertProps['variant'];

const bgByVariant: Record<AlertVariant, string> = {
  error: 'bg-red-100',
  warning: 'bg-yellow-100',
  success: 'bg-green-100',
  info: 'bg-blue-100',
};

const textByVariant: Record<AlertVariant, string> = {
  error: 'text-red-800',
  warning: 'text-yellow-800',
  success: 'text-green-800',
  info: 'text-blue-800',
};

const borderColorByVariant: Record<AlertVariant, string> = {
  error: 'border-red-500',
  warning: 'border-yellow-500',
  success: 'border-green-500',
  info: 'border-blue-500',
};

const iconColorByVariant: Record<AlertVariant, string> = {
  error: 'text-red-700',
  warning: 'text-yellow-700',
  success: 'text-green-700',
  info: 'text-blue-700',
};

const buttonByVariant: Record<AlertVariant, string> = {
  error: 'focus-visible:ring-red-500',
  warning: 'focus-visible:ring-yellow-500',
  success: 'focus-visible:ring-green-500',
  info: 'focus-visible:ring-blue-500',
};

const iconByVariant = {
  error: CrossInCircleIcon,
  warning: ExclamationIcon,
  success: CheckInCircleIcon,
  info: InfoIcon,
};

export const ErrorAlert = (props: {
  errors: React.ReactNode[];
  className?: string;
}) => {
  const alertRef = React.useRef<HTMLDivElement>(null);

  const errors = props.errors.filter(Boolean);

  const hasError = errors.length > 0;

  React.useEffect(() => {
    if (hasError && alertRef.current) {
      scrollIntoView(alertRef.current, {
        scrollMode: 'if-needed',
      });
    }
  }, [hasError]);

  return hasError ? (
    <Alert variant='error' ref={alertRef} className={props.className}>
      <Transition show={hasError}>
        <ul className='flex flex-col space-y-1'>
          {errors.map((err, i) => (
            <Transition.Child
              as='li'
              enter='transition-all duration-150 overflow-hidden'
              enterFrom='h-0'
              enterTo='h-5'
              leave='transition-all duration-150 overflow-hidden'
              leaveFrom='h-5'
              leaveTo='h-0'
              key={i}
            >
              {err}
            </Transition.Child>
          ))}
        </ul>
      </Transition>
    </Alert>
  ) : null;
};
