import * as React from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

import { cls } from '@/lib/clsxm';

import { borderByStatus } from './border';
import { useFieldControlContext } from './field-context';

export interface TextareaProps extends TextareaAutosizeProps {
  onChangeValue?: (value: string) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ onChangeValue, minRows = 2, ...props }, forwardedRef) {
    const { inputId, status } = useFieldControlContext(props.id);

    return (
      <TextareaAutosize
        {...props}
        className={cls(
          'block min-w-0 w-full sm:text-sm rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
          status ? borderByStatus[status] : 'border-gray-300',
          (props.readOnly || props.disabled) && 'bg-gray-100 text-gray-400',
          props.className
        )}
        id={inputId}
        minRows={minRows}
        ref={forwardedRef}
      />
    );
  }
);
