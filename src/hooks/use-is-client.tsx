import * as React from 'react';

import { createNamedContext } from '@/lib/create-named-context';

const IsClientContext = createNamedContext('IsClient', true);

export const IsClientProvider = (props: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <IsClientContext.Provider value={isClient}>
      {props.children}
    </IsClientContext.Provider>
  );
};

export const useIsClient = () => React.useContext(IsClientContext);
