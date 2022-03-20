import { RadioGroup } from '@headlessui/react';
import * as React from 'react';

import { cls } from '@/lib/clsxm';

export interface RadioCardProps {
  value: string | number;
  label: string;
}

const RadioCardImpl = function RadioCard(props: RadioCardProps) {
  return (
    <RadioGroup.Option value={props.value}>
      {({ active, checked }) => (
        <RadioGroup.Label
          className={cls(
            'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none',
            active && 'ring-2 ring-offset-2 ring-primary-500',
            checked
              ? 'bg-primary-600 border-transparent text-white hover:bg-primary-700'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
          )}
        >
          {props.label}
        </RadioGroup.Label>
      )}
    </RadioGroup.Option>
  );
};

export interface RadioCardGroupProps<Value extends string | number>
  extends React.ComponentPropsWithoutRef<'div'> {
  value: Value | undefined;
  onChangeValue: (value: Value) => void;
  children: React.ReactNode;
  disabled?: boolean;
  noSpacing?: boolean;
}

const RadioCardGroup = <Value extends string | number>({
  value,
  onChangeValue,
  disabled,
  noSpacing,
  ...divProps
}: RadioCardGroupProps<Value>) => {
  return (
    <RadioGroup value={value} onChange={onChangeValue} disabled={disabled}>
      <div
        {...divProps}
        className={cls(!noSpacing && 'flex gap-3', divProps.className)}
      />
    </RadioGroup>
  );
};

export const RadioCard = Object.assign(RadioCardImpl, {
  Group: RadioCardGroup,
});
