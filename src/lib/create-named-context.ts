import * as React from 'react';

export const createNameContext = <ContextType>(
  displayName: string,
  defaultValue: ContextType
) => {
  const Context = React.createContext(defaultValue);
  Context.displayName = displayName;
  return Context;
};
