"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [isMount, setMount] = React.useState(false)

  React.useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount) {
    return null
  }

  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>
}

export default ThemeProvider