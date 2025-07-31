import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();
export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => {
  return useContext(ThemeContext);
};

const defaultTheme = {
  primaryColor: '#6366f1', // Modern indigo
  secondaryColor: '#f59e0b', // Modern amber
  backgroundColor: '#f8fafc', // Light gray background
  cardBackground: '#ffffff',
  textColor: '#1e293b', // Slate gray
  secondaryTextColor: '#64748b', // Lighter slate
  accentColor: '#10b981', // Modern green
  errorColor: '#ef4444', // Modern red
};

export const ThemeProvider = ({ children }) => {
  const [themeColors, setThemeColors] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('themeColors');
        return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    return defaultTheme;
  });

  const updateTheme = (newTheme) => {
    setThemeColors(newTheme);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeColors', JSON.stringify(newTheme));
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  // Update CSS custom properties when theme colors change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const cardBg = themeColors.cardBackground || '#ffffff';
      const bgColor = themeColors.backgroundColor || '#f8fafc';
      
      // Create a lighter version of the card background for the body
      const bodyBg = cardBg === '#ffffff' 
        ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        : `linear-gradient(135deg, ${cardBg}15 0%, ${cardBg}08 100%)`;
      
      root.style.setProperty('--card-background', cardBg);
      root.style.setProperty('--body-background', bodyBg);
    }
  }, [themeColors.cardBackground, themeColors.backgroundColor]);

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: themeColors.primaryColor || '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: themeColors.secondaryColor || '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      background: {
        default: themeColors.backgroundColor || '#f8fafc',
        paper: themeColors.cardBackground || '#ffffff',
      },
      text: {
        primary: themeColors.textColor || '#1e293b',
        secondary: themeColors.secondaryTextColor || '#64748b',
      },
      success: {
        main: themeColors.accentColor || '#10b981',
      },
      error: {
        main: themeColors.errorColor || '#ef4444',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: `linear-gradient(135deg, ${themeColors.primaryColor || '#6366f1'} 0%, ${themeColors.primaryColor ? themeColors.primaryColor + 'cc' : '#818cf8'} 100%)`,
            boxShadow: `0 4px 20px ${themeColors.primaryColor || '#6366f1'}4d`,
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: themeColors.primaryColor || '#6366f1',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: themeColors.primaryColor || '#6366f1',
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
            },
          },
        },
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
