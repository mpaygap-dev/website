import * as React from 'react';

import { cls } from '@/lib/clsxm';
import { createNamedContext } from '@/lib/create-named-context';
import { callAll } from '@/lib/fn-lib';
import { useId } from '@/hooks/use-id';

export interface RadioContextType {
  value: string;
  name: string;
  onChangeValue: (value: string) => void;
}

const RadioContext = createNamedContext<RadioContextType>(
  'RadioContext',
  undefined as any
); // intentionally no default so it is easily known if consumer is wrapped

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'children'> {
  value: string;
  label: React.ReactNode;
  onChangeValue?: (checked: boolean) => void;
  wrapperClass?: string;
  labelClass?: string;
}

const RadioImpl = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    onChangeValue,
    wrapperClass,
    labelClass,
    checked,
    name,
    className,
    ...inputProps
  },
  ref
) {
  const inputId = useId(inputProps.id);
  const radioGroupContext = React.useContext(RadioContext);

  const isChecked = radioGroupContext
    ? radioGroupContext.value === inputProps.value
    : checked;

  const radioName = radioGroupContext ? radioGroupContext.name : name;

  return (
    <label
      className={cls(
        'flex items-center gap-2',
        inputProps.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        wrapperClass
      )}
    >
      <span className={cls('relative flex', className)}>
        <input
          {...inputProps}
          className='h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500'
          onChange={callAll(
            inputProps.onChange,
            onChangeValue && ((ev) => onChangeValue(ev.target.checked)),
            radioGroupContext &&
              (() => radioGroupContext.onChangeValue(inputProps.value))
          )}
          name={radioName}
          checked={isChecked}
          id={inputId}
          type='radio'
          ref={ref}
        />
      </span>
      <span
        className={cls(
          'text-base sm:text-sm',
          inputProps.disabled && 'opacity-40',
          labelClass
        )}
      >
        {label}
      </span>
    </label>
  );
});

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  name: string;
  onChangeValue: (value: string) => void;
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  noSpacing?: boolean;
}

const RadioGroup = ({
  value,
  name,
  onChangeValue,
  layout,
  noSpacing,
  ...divProps
}: RadioGroupProps) => {
  const contextValue = React.useMemo(
    () => ({
      value: value,
      name: name,
      onChangeValue: onChangeValue,
    }),
    [value, name, onChangeValue]
  );

  return (
    <RadioContext.Provider value={contextValue}>
      <div
        {...divProps}
        className={cls(
          !noSpacing && [
            'py-2',
            layout === 'horizontal'
              ? 'flex items-center gap-8 flex-wrap'
              : 'space-y-4',
          ],
          divProps.className
        )}
      />
    </RadioContext.Provider>
  );
};

export const Radio = Object.assign(RadioImpl, {
  Group: RadioGroup,
});
