import { pickAndOmit } from '@/lib/object';

import { FieldProps } from './field';

export const groupProps = <
  OriProps extends Omit<FieldProps & { wrapperClass?: string }, 'children'>
>(
  props: OriProps
) => {
  const {
    picked: { wrapperClass, ...fieldProps },
    omitted,
  } = pickAndOmit(props, fieldKeys);

  return {
    fieldProps: {
      ...fieldProps,
      className: wrapperClass,
    },
    controlProps: omitted,
  };
};

export type ComposedFieldProps = Omit<FieldProps, 'className' | 'children'> & {
  wrapperClass?: string;
};

const fieldKeys = [
  'status',
  'label',
  'wrapperClass',
  'helpText',
  'secondaryLabel',
] as const;
