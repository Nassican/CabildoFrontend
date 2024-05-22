'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [isMount, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
};

export default ThemeProvider;
