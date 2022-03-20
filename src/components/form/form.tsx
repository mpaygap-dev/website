import * as React from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';

import { createNamedContext } from '@/lib/create-named-context';

import { DropdownField } from './dropdown-field';
import { LinearScaleField } from './linear-scale-field';
import { RadioField } from './radio-field';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';

interface FormControlContextType {
  control: Control<any> | undefined;
  isLoading?: boolean;
}

const FormControlContext = createNamedContext<FormControlContextType>(
  'FormControlContext',
  {
    control: undefined,
  }
);

const FormImpl = React.forwardRef<
  HTMLFormElement,
  React.ComponentPropsWithoutRef<'form'> & FormControlContextType
>(function Form({ control, isLoading, ...props }, forwardedRef) {
  return (
    <FormControlContext.Provider
      value={React.useMemo(
        () => ({
          control,
          isLoading,
        }),
        [control, isLoading]
      )}
    >
      <form {...props} ref={forwardedRef} />
    </FormControlContext.Provider>
  );
});

type FormControlProps<OriControlProps> = Omit<
  OriControlProps,
  'value' | 'onChangeValue'
> & {
  name: string;
  defaultValue?: string;
  rules?: UseControllerProps['rules'];
};

const makeFormControl = <OriControlProps extends { required?: boolean }>(
  Component: React.ComponentType<OriControlProps>
) => {
  function FormControl({
    required,
    rules = required ? { required } : undefined,
    ...props
  }: FormControlProps<OriControlProps>) {
    const { control, isLoading } = React.useContext(FormControlContext);

    return (
      <Controller
        name={props.name}
        control={control}
        defaultValue={props.defaultValue as any}
        rules={rules}
        render={({ field }) => (
          <Component
            {...(props as any)}
            required={required}
            value={field.value}
            name={field.name}
            onChangeValue={field.onChange}
            onBlur={field.onBlur}
            disabled={isLoading}
          />
        )}
      />
    );
  }

  FormControl.displayName = `Form${Component.name || Component.displayName}`;

  return FormControl;
};

export const Form = Object.assign(FormImpl, {
  DropdownField: makeFormControl(DropdownField),
  TextField: makeFormControl(TextField),
  TextareaField: makeFormControl(TextareaField),
  RadioField: makeFormControl(RadioField),
  LinearScaleField: makeFormControl(LinearScaleField),
});
