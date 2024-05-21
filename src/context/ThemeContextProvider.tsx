import React from "react";
import { defaultContextValue, ThemeContextType } from "../@types/Theme";

export const ThemeContext =
  React.createContext<ThemeContextType>(defaultContextValue);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState<boolean>(true); // true if light theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
