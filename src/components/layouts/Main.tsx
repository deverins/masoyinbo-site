"use client"
import { useTheme } from '@/hooks/themeContext';
import React, { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  
  // Get the current theme from context
  const { theme } = useTheme();
  
  return <main 
    className={`${theme== 'dark' && 'dark'} `}>
      <section className='min-h-[100dvh] w-full bg-slate-200 dark:bg-slate-900'>
        {children}
      </section>
  </main>
}

export default Main

