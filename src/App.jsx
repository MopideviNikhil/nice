import React, { useState, useEffect, createContext, useMemo } from 'react';
import './App.css';
import LandingPage from './tailwidBlocks/pages/LandingPage';

export const Context = createContext();

const App = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  const [theme, setTheme] = useState(initialTheme);

  // Apply theme on load and when it changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for OS-level theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Toggle function
  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Context value (memoized)
  const contextValue = useMemo(() => ({
    theme,
    toggleDarkMode,
  }), [theme]);

  return (
    <Context.Provider value={contextValue}>
      <LandingPage />
    </Context.Provider>
  );
};

export default App;
