import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
