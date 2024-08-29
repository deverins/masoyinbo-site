"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark' ;

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = async() => {

    const current = theme === 'light' ? 'dark' : 'light'
    await setTheme(current);
    localStorage.theme = current
  };

  useEffect(() => {
    if (localStorage.theme && ['light', 'dark'].includes(localStorage.theme)) {
      return setTheme(localStorage.theme)
    } 
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode?'dark':'light')
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
