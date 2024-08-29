"use client"
import { useTheme } from '@/hooks/themeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import React from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <SunIcon className="h-6 w-6 text-white" />
      ) : (
        <MoonIcon className="h-6 w-6 text-text-saffron" />
      )}
    </button>
  );
};

export default ThemeToggle;
