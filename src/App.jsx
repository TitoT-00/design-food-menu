import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';
import { TitleProvider } from './contexts/TitleContext';
import { TaxTipProvider } from './contexts/TaxTipContext';
import AdminDashboard from './pages/AdminDashboard';
import StoreFront from './pages/StoreFront';
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const { muiTheme } = useTheme();
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
        <AuthProvider>
          <TitleProvider>
            <TaxTipProvider>
              <MenuProvider>
                <CartProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth:'100vw' }}>
              <Navigation />
              <Box sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/store" element={<StoreFront />} />
                </Routes>
              </Box>
            </Box>
                </CartProvider>
              </MenuProvider>
            </TaxTipProvider>
          </TitleProvider>
        </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
