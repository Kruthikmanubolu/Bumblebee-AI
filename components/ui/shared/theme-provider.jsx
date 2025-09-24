import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class" // this ensures the theme is applied as a class on the root element
      defaultTheme="dark" // or "light" based on your preference
      enableSystem={true} // optionally allow the user's system preference to override the default theme
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
