export interface ThemeContextType {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultContextValue: ThemeContextType = {
  theme: true,
  setTheme: () => {},
};
