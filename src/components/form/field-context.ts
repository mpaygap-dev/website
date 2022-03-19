import * as React from 'react';

import { createNamedContext } from '@/lib/create-named-context';
import { noop } from '@/lib/fn-lib';
import { useId } from '@/hooks/use-id';

export type FieldStatus = 'warning' | 'error' | 'success';

export interface FieldContextType {
  inputId: string | undefined;
  setInputId: React.Dispatch<React.SetStateAction<string>>;
  status: FieldStatus | undefined;
}

const DEFAULT_CONTEXT: FieldContextType = {
  inputId: undefined,
  setInputId: noop,
  status: undefined,
};

export const FieldContext = createNamedContext('Field', DEFAULT_CONTEXT);

export const useFieldControlContext = (providedId: string | undefined) => {
  const id = useId(providedId);

  const { inputId, setInputId, status } = React.useContext(FieldContext);

  React.useEffect(() => {
    if (id) {
      setInputId((prevId) => prevId || id);
    }
  }, [id, setInputId]);

  return {
    inputId: id || inputId,
    status,
  };
};
