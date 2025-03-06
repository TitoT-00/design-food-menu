import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();
export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => {
  return useContext(ThemeContext);
};

const defaultTheme = {
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  backgroundColor: '#f5f5f5',
  cardBackground: '#ffffff',
  textColor: '#000000',
  secondaryTextColor: '#666666',
};

export const ThemeProvider = ({ children }) => {
  const [themeColors, setThemeColors] = useState(() => {
    const savedTheme = localStorage.getItem('themeColors');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  const updateTheme = (newTheme) => {
    setThemeColors(newTheme);
    localStorage.setItem('themeColors', JSON.stringify(newTheme));
  };

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: themeColors.primaryColor,
      },
      secondary: {
        main: themeColors.secondaryColor,
      },
      background: {
        default: themeColors.backgroundColor,
        paper: themeColors.cardBackground,
      },
      text: {
        primary: themeColors.textColor,
        secondary: themeColors.secondaryTextColor,
      },
    },
  });

  const contextValue = { themeColors, updateTheme, muiTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
