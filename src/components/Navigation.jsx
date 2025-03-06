import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
} from '@mui/material';
import { ShoppingCart, Store as StoreIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Food Menu POS
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          {isAdmin ? (
            <>
              <Button color="inherit" onClick={() => navigate('/admin')}>
                Admin Dashboard
              </Button>
              <Button
                color="inherit"
                startIcon={<StoreIcon />}
                onClick={() => navigate('/store')}
              >
                Store View
              </Button>
            </>
          ) : (
            <Badge badgeContent={cart.items.length} color="secondary">
              <IconButton color="inherit">
                <ShoppingCart />
              </IconButton>
            </Badge>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
